import React, { useCallback, useEffect, useState, useRef } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import ChatMenu from '../ui components/ChatMenu';
import { useChatContext } from '../context/ChatProvider';
import { styled } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Avatar } from '@mui/material';
import FullscreenImageModal from '../ui components/FullScreenImageModel';
import EmojiPickerModel from '../ui components/EmojiPickerModel';
import axios from '../config/axios';
import ScrollableMessages from './ScrollableMessages';
import socket from '../socket/socket';
import { getChatProfilePic } from '../chatLogics';

const OuterBox = styled('Box')`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  overflow: hidden;
`
const InnerBox = styled('Box')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 6px;
  background-color: #f0f2f5;
`;

function ChatBox() {
  
  const { selectedChat, accessToken } = useChatContext();
  const [openImageModel, setOpenImageModel] = useState(false);
  const { user } = useChatContext();
  const [popupAnchorEl, setPopupAnchorEl] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const messageRef = useRef(null);


  const popupHandleClick = (event) => {
    setPopupAnchorEl(popupAnchorEl ? null : event.currentTarget);
  };

  const onEmojiClick = (event, emojiObject) => {
    const uniCodeEmoji = String.fromCodePoint("0x" + event.unified);
    const text = message.substring(0, startIndex) + uniCodeEmoji + message.substring(endIndex);
    setStartIndex(startIndex + uniCodeEmoji.length);
    setEndIndex(endIndex + uniCodeEmoji.length);
    setMessage(text);
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const fetchMessages = useCallback(async() => {
    if(!selectedChat) return;
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
      const { data } = await axios.get(`/api/messages/${selectedChat._id}`, config);
      setMessages(data);
    } catch(error) {
      console.log(error);
    }
  }, [selectedChat, accessToken]);

  
  const sentMessageHandler = async(event) => {
    console.log(event);
    if(event.key !== 'Enter' && event.type !== 'click') return;
    try {
      if(message.trim() === '' || !selectedChat) return;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      }
      setMessage('');
      const { data } = await axios.post('/api/messages/sentMessage', {
        chatId: selectedChat._id,
        message,
      }, config);
      setMessages([...messages, data]);
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
      console.log(data);
    } catch(error) {
      console.log(error);
    }
  }
  

  useEffect(() => {
    fetchMessages();
    selectedChat && socket.emit('joinChat', selectedChat._id);
  }, [selectedChat, fetchMessages]);


  useEffect(() => {
    const handleNewMessage = (message) => {
      if (message.chat._id === selectedChat._id) {
        setMessages((prevMessages) => {
          if (prevMessages.some((msg) => msg._id === message._id)) {
            return prevMessages;
          }
          return [...prevMessages, message];
        });
      }
    };
    socket.on('newMessage', handleNewMessage);
    
    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [selectedChat]);

  
  return (
    <>
    {
      selectedChat ? 
      (
        <OuterBox>

          <InnerBox>
            <Box
              display={'flex'}
              alignItems={'center'}
            >
              <Avatar
                sx={{ marginRight: 2, cursor: 'pointer' }}
                alt={selectedChat.users[0].name}
                src={getChatProfilePic(selectedChat, user)}
                imgProps={{
                  loading: 'lazy',
                }}
                onClick={() => setOpenImageModel(true)}
              />
              <Typography textTransform={'capitalize'}>{selectedChat.isGroupChat ? selectedChat.chatName : (selectedChat.users[0]._id === user._id ? selectedChat.users[1].name : selectedChat.users[0].name)}</Typography>
            </Box>
            <ChatMenu />
          </InnerBox>

          <ScrollableMessages messageRef={messageRef} messages={messages} />

          <Box 
            padding={1}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <EmojiPickerModel popupAnchorEl={popupAnchorEl} emojiPickerRef={emojiPickerRef} setPopupAnchorEl={setPopupAnchorEl} onEmojiClick={onEmojiClick} handleClose={popupHandleClick} />
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
            <SentimentSatisfiedAltIcon ref={emojiPickerRef} onClick={popupHandleClick} sx={{ ":hover":{ cursor:'pointer', backgroundColor:'#f2eeed' }, padding:'3px', marginRight:'5px', borderRadius:'3px' }} />
            <AttachFileIcon onClick={handleFileInputClick} sx={{ ":hover":{ cursor:'pointer', backgroundColor:'#f2eeed' }, padding:'3px', marginRight:'5px', borderRadius:'3px' }} />
            <TextField 
              fullWidth 
              size='small' 
              placeholder='Type a message'
              onSelect={(e) => {
                setStartIndex(e.target.selectionStart);
                setEndIndex(e.target.selectionEnd);
              }}
              onKeyDown={sentMessageHandler}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{ marginRight:'10px', borderStyle:'none', borderRadius:'2px', boxShadow:'0px 4px 20px rgba(0, 0, 0, 0.1)' }} 
            />
            <Button
              variant="contained"
              startIcon={<SendIcon />}
              onClick={sentMessageHandler}
              sx={{
                justifyContent: 'center',
                '& .MuiButton-startIcon': {
                  margin: 0,
                },
                borderRadius: '50%', 
                width: 40, 
                height: 40, 
                minWidth: 40, 
              }}
            />
          </Box>
          <FullscreenImageModal
            open={openImageModel} 
            handleClose={() => setOpenImageModel(false)} 
            imgSrc={getChatProfilePic(selectedChat, user)} 
            alt="Chat Avatar"
          />
        </OuterBox>
      ) 
      : 
      (
        <Box
          width= {'60%'}
          height= {'100%'}
          display= {'flex'}
          flexDirection={'column'}
          bgcolor={'white'}
          boxShadow={'0px 4px 20px rgba(0, 0, 0, 0.1)'}
          marginBottom={'16px'}
          overflow= {'hidden'}
        >
          <Box
            display={'flex'}
            width={'100%'}
            height={'100%'}
            flexDirection={'column'}
            alignItems={'center'}
            paddingTop={20}
          >
            <img width={250} alt='sa' src='https://static.whatsapp.net/rsrc.php/v3/yX/r/dJq9qKG5lDb.png'></img>
            <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            >
              <Typography variant='h5'>ChatterBox</Typography>
              <Typography variant='body2'>Please select a chat to start messaging</Typography>
            </Box>
          </Box>
        </Box>
      )
      
    }
    </>
  )
}

export default ChatBox;
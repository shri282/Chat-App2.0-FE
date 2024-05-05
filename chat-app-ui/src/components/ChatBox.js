import React from 'react'
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

const OuterBox = styled('Box')`
  width: 60%;
  height: 87vh;
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
  padding: 10px;
  background-color: #f0f2f5;
`;

function ChatBox() {
  
  const { selectedChat } = useChatContext();
  const [openImageModel, setOpenImageModel] = React.useState(false);
  const { user } = useChatContext();
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
  const [popupAnchorEl, setPopupAnchorEl] = React.useState(null);
  const [startIndex, setStartIndex] = React.useState(0);
  const [endIndex, setEndIndex] = React.useState(0);
  const [message, setMessage] = React.useState('');
  const fileInputRef = React.useRef(null);
  
  const popupHandleClick = (event) => {
    setShowEmojiPicker(!showEmojiPicker);
    setPopupAnchorEl(popupAnchorEl ? null : event.currentTarget);
  };

  const onEmojiClick = (event, emojiObject) => {
    const text = message.substring(0, startIndex) + emojiObject.target + message.substring(endIndex);
    setMessage(text);
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const sentMessageHandler = () => {
    console.log(message);
  }

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
                src={selectedChat.isGroupChat ? selectedChat.users[0].pic : selectedChat.users[0]._id === user._id ? selectedChat.users[1].pic : selectedChat.users[0].pic}
                imgProps={{
                  loading: 'lazy',
                }}
                onClick={() => setOpenImageModel(true)}
              />
              <Typography textTransform={'capitalize'}>{selectedChat.chatName}</Typography>
            </Box>
            <ChatMenu />
          </InnerBox>
          <Box sx={{ backgroundImage:"url('/images/kristina-kashtanova-EwpUsHDmEwg-unsplash.jpg')", backgroundSize:'cover'}} flexGrow={2}>

          </Box>
          <EmojiPickerModel popupAnchorEl={popupAnchorEl} showEmojiPicker={showEmojiPicker} onEmojiClick={onEmojiClick} />
          <Box 
            padding={1}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <SentimentSatisfiedAltIcon onClick={popupHandleClick} sx={{ ":hover":{ cursor:'pointer', backgroundColor:'#f2eeed' }, padding:'3px', marginRight:'5px', borderRadius:'3px' }} />
            <AttachFileIcon onClick={handleFileInputClick} sx={{ ":hover":{ cursor:'pointer', backgroundColor:'#f2eeed' }, padding:'3px', marginRight:'5px', borderRadius:'3px' }} />
            <TextField 
              fullWidth 
              size='small' 
              placeholder='Type a message'
              onSelect={(e) => {
                setStartIndex(e.target.selectionStart);
                setEndIndex(e.target.selectionEnd);
              }}
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
            imgSrc={selectedChat.isGroupChat ? selectedChat.users[0].pic : selectedChat.users[0]._id === user._id ? selectedChat.users[1].pic : selectedChat.users[0].pic} 
            alt="Chat Avatar"
          />
        </OuterBox>
      ) 
      : 
      (
        <Box
          width= {'60%'}
          height= {'87vh'}
          display= {'flex'}
          flexDirection={'column'}
          bgcolor={'white'}
          boxShadow={'0px 4px 20px rgba(0, 0, 0, 0.1)'}
          marginBottom={'16px'}
          overflow= {'hidden'}
        >
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            paddingTop={30}
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
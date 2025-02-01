import React, { useState, useRef } from 'react'
import { Box, Button, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiPickerModel from '../../ui components/EmojiPickerModel';

function ChatBoxActions({ setMessage, sentMessageHandler, message }) {

    const [popupAnchorEl, setPopupAnchorEl] = useState(null);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(0);
    const fileInputRef = useRef(null);
    const emojiPickerRef = useRef(null);

    const popupHandleClick = (event) => {
      setPopupAnchorEl(popupAnchorEl ? null : event.currentTarget);
    };
      
    const onEmojiClick = (event) => {
      const uniCodeEmoji = String.fromCodePoint("0x" + event.unified);
      const text = message.substring(0, startIndex) + uniCodeEmoji + message.substring(endIndex);
      setStartIndex(startIndex + uniCodeEmoji.length);
      setEndIndex(endIndex + uniCodeEmoji.length);
      setMessage(text);
    };
      
    const handleFileInputClick = () => {
      fileInputRef.current.click();
    };

  return (
    <Box 
      padding={1}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
        <EmojiPickerModel popupAnchorEl={popupAnchorEl} emojiPickerRef={emojiPickerRef} setPopupAnchorEl={setPopupAnchorEl} onEmojiClick={onEmojiClick} handleClose={popupHandleClick} />
        <SentimentSatisfiedAltIcon ref={emojiPickerRef} onClick={popupHandleClick} sx={{ ":hover":{ cursor:'pointer', backgroundColor:'#f2eeed' }, padding:'3px', marginRight:'5px', borderRadius:'3px' }} />
        
        <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
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
  )
}

export default ChatBoxActions
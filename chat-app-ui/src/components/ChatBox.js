import React from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import ChatMenu from '../ui components/ChatMenu';
import { useChatContext } from '../context/ChatProvider';
import { styled } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import InputAdornment from '@mui/material/InputAdornment';
import AttachFileIcon from '@mui/icons-material/AttachFile';

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

  const attachFileHandler = () => {
    console.log('working...');
  }

  return (
    <>
    {
      selectedChat ? 
      (
        <OuterBox>
          <InnerBox>
            <Typography>chatname</Typography>
            <ChatMenu />
          </InnerBox>
          <Box sx={{ backgroundImage:"url('/images/bg.jpg')", backgroundSize:'cover'}} flexGrow={2}>

          </Box>
          <Box 
            padding={1}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            bgcolor={'#f0f2f5'}
          >
            <TextField 
              fullWidth 
              size='small' 
              sx={{ marginRight:'10px', borderStyle:'none', borderRadius:'2px', boxShadow:'0px 4px 20px rgba(0, 0, 0, 0.1)' }} 
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                      <SentimentSatisfiedAltIcon sx={{ ":hover":{ cursor:'pointer' }, marginLeft:'-8px' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'> 
                      <AttachFileIcon sx={{ ":hover":{ cursor:'pointer' }, marginRight:'-8px'}} />
                      <input
                        type="file"
                        hidden
                        onClick={attachFileHandler}
                        style={{ display: 'none' }} 
                      />
                  </InputAdornment>
                )
              }}
            />
            <Button
              variant="contained"
              startIcon={<SendIcon />}
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
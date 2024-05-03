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
  width: 100%;
  height: 650px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  margin: 2px;
  margin-left: 16px;
  margin-right: 20px;
  margin-bottom: 16px;
  margin-top: 16px;
  overflow: hidden;
`
const InnerBox = styled('Box')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: lightgray;
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
          <Box bgcolor={'#fffdfc'} flexGrow={2}>

          </Box>
          <Box 
          padding={1}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          bgcolor={'#fffdfc'}
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
        <OuterBox>
          <InnerBox>
            <Typography>chatname</Typography>
              {/* <ChatMenu /> */}
          </InnerBox>
          <Typography variant='h5' color={'red'} margin={30}>
            please select any chat to start chatting.....   
          </Typography>
        </OuterBox>

      )

    }
    </>
  )
}

export default ChatBox;
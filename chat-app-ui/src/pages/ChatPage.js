import React from 'react'
import { useChatContext } from '../context/ChatProvider'
import { Box, Typography } from '@mui/material';
import SideDrawer from '../components/SideDrawer';
import MenuContent from '../components/MenuContent';
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';

function ChatPage() {
  const { user } = useChatContext();

  return (
    <Box width={'100%'} display={'flex'} flexDirection={'column'}>
      { 
        user && 
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width : '100%',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: '5px 10px 5px 10px', 
            border: '4px solid #E0DFDF'
          }}
        >
          <SideDrawer />
          <Typography variant='h5' color={'orange'}>ChatterBox</Typography>
          <MenuContent />
        </Box>
      }
      <Box
      display={'flex'}
      width={'100%'}
      flexDirection={'row'}
      justifyContent={'space-between'}
      >
        { user && <MyChats /> }
        { user && <ChatBox />}
      </Box>
    </Box>
  )
}

export default ChatPage
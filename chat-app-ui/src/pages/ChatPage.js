import React from 'react'
import { useChatContext } from '../context/ChatProvider'
import { Box, Typography } from '@mui/material';
import SideDrawer from '../components/SideDrawer';
import MenuContent from '../ui components/MenuContent';
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';

function ChatPage() {
  const { user } = useChatContext();

  return (
    <Box 
      width={'100%'} 
      height={'100vh'} 
      display={'flex'} 
      flexDirection={'column'}
      overflow={'hidden'}
    >
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
            border: '1px solid #E0DFDF',
            flexGrow: 1
          }}
        >
          <SideDrawer />
          <Typography variant='h5' color={'orange'} >ChatterBox</Typography>
          <MenuContent />
        </Box>
      }
      <Box
        display={'flex'}
        width={'100%'}
        height={'100%'}
        flexGrow={2}
        marginTop={2}
        marginBottom={2}
        flexDirection={'row'}
        justifyContent={'space-between'}
        overflow={'hidden'}
      >
        { user && <MyChats /> }
        { user && <ChatBox />}
      </Box>
    </Box>
  )
}

export default ChatPage
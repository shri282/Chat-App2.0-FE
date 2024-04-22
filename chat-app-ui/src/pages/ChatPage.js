import React from 'react'
import { useChatContext } from '../context/ChatProvider'
import { Box } from '@mui/material';
import SideDrawer from '../components/SideDrawer';
import MenuContent from '../components/MenuContent';
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';

function ChatPage() {
  const { user } = useChatContext();

  return (
    <div>
      { 
        user && 
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '5px',
            backgroundColor: 'white',
            padding: '5px 10px 5px 10px', 
            border: '4px solid #E0DFDF'
          }}
        >
          <SideDrawer />
          <p>chatapp</p>
          <MenuContent />
        </Box>
      }
      <Box
      display={'flex'}
      flexDirection={'row'}
      justifyContent={'space-between'}
      >
        { user && <MyChats /> }
        { user && <ChatBox />}
      </Box>
    </div>
  )
}

export default ChatPage
import React from 'react';
import { Avatar, Box, Button, IconButton, Tooltip } from '@mui/material';
import MyChats from '../components/Chat/MyChats';
import ChatBox from '../components/ChatBox/ChatBox';
import SideDrawer from '../ui components/SideDrawer';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuContent from "../ui components/MenuContent";
import { useChatContext } from '../context/ChatProvider';
import { useNavigate } from 'react-router-dom';

function ChatPage() {
  const { user } = useChatContext();
  const navigate = useNavigate();

  const logoutHandler = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('accessToken');
    window.location.reload();
  }

  const navs = [
    {
      id: 1,
      name: 'orders',
      component: {
        left: <MyChats />,
        right: <ChatBox />
      },
      icon: <ChatIcon />,
      default: true
    },
    {
      id: 2,
      name: 'settings',
      component: {
        left: <Box sx={{ width: '50%', height: '100vh', backgroundColor: 'white' }}>left settings</Box>,
        right: <Box sx={{ width: '50%', height: '100vh', backgroundColor: 'white' }}>right settings</Box>
      },
      icon: <SettingsIcon />,
      default: false
    },
    {
      id: 3,
      name: 'profile',
      component: {
        left: <Box sx={{ width: '50%', height: '100vh', backgroundColor: 'white' }}>
          <Button onClick={logoutHandler}>Logout</Button>
        </Box>,
        right: <Box sx={{ width: '50%', height: '100vh', backgroundColor: 'white' }}>right profile</Box>
      },
      icon: <Tooltip title="profile">
              <IconButton
                sx={{ width: 24, height: 24 }}
              >
                <Avatar src={user?.pic || ""} sx={{ width: 24, height: 24, borderRadius: '50%' }}></Avatar>
              </IconButton>
            </Tooltip>,
      default: false
    },
  ];

  return (
    <>
      <SideDrawer navs={navs} />
    </>
  );
}

export default ChatPage;
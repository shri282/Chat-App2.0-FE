import React, { useCallback, useEffect } from 'react'
import { useChatContext } from '../../context/ChatProvider'
import { Box, Button, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreateGCModel from '../../ui components/CreateGCModel';
import Chat from './Chat';
import socket from '../../socket/socket';
import { newMessage } from '../../socket/socketListeners';

function MyChats() {
  const { chats, user, setMessages, setAllNotifications, selectedChat, setChats } = useChatContext();

  const joinChatsToRoom = useCallback(() => {
    chats.forEach((chat) => {
      socket.emit('joinChat', chat._id);
    })
  }, [chats]);

  useEffect(() => {
    joinChatsToRoom();
  }, [joinChatsToRoom]);

  const newMessageHandler = useCallback((message) => {
    newMessage({ setChats, selectedChat, setAllNotifications, user, setMessages }, message);
  }, [setChats, selectedChat, setAllNotifications, user, setMessages]);

  useEffect(() => {
    socket.on('newMessage', newMessageHandler);
    
    return () => {
      socket.off('newMessage', newMessageHandler);
    };
  }, [newMessageHandler]);

  return (
    <Box
      width={'40%'}
      height={'100%'}
      display={'flex'}
      flexDirection={'column'}
      borderRight={'1px solid #E0DFDF'}
      bgcolor={'white'}
      boxShadow={"0px 4px 20px rgba(0, 0, 0, 0.1)"}
      overflow={'hidden'}
    >
      <Box
        width={'97%'}
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        border={'0.5px solid #E0DFDF'}
        alignItems={'center'}
        padding={1}
      >
        <Typography variant='h5' color={'#e6938c'}>Chats</Typography>
        <CreateGCModel user={user}>
          <Button variant='outlined' startIcon={<AddIcon />}>ADD GROUP</Button>
        </CreateGCModel>
      </Box>
        <Stack
          width={'95%'}
          height={'90%'}
          bgcolor={"#FFFCFC"}
          gap={1}
          padding={1}
          overflow={'hidden'}
          sx={{ overflowY:'auto' }}
        >
          {
            chats && chats.map((chat) => {
              return (
                <Chat key={chat._id} chatData={chat} />
              )
            })
          }
        </Stack>
    </Box>
  )
}

export default MyChats
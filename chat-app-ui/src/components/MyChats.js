import React from 'react'
import { useChatContext } from '../context/ChatProvider'
import { Box, Button, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreateGCModel from './CreateGCModel';

function MyChats() {
  const { chats, user } = useChatContext();
  const [selectedChat, setselectedChat] = React.useState()

  const selectChatHandler = (chat) => {
    setselectedChat(chat);
  }

  return (
    <Box
    width={'35%'}
    height={'650px'}
    bgcolor={'white'}
    borderRadius={2}
    boxShadow={"0px 4px 20px rgba(0, 0, 0, 0.1)"}
    marginLeft={2}
    marginRight={20}
    marginBottom={2}
    marginTop={2}
    >
    <Box
    display={'flex'}
    flexDirection={'row'}
    justifyContent={'space-between'}
    alignItems={'center'}
    margin={1}
    
    >
      <Typography variant='h5' color={'orange'}>My Chats</Typography>
      <CreateGCModel user={user}>
        <Button variant='outlined' startIcon={<AddIcon />}>ADD GROUP</Button>
      </CreateGCModel>
    </Box>
    <Box>
      <Stack
      width={'90%'}
      height={'560px'}
      spacing={2}
      marginLeft={1}
      marginTop={2}
      padding={1}
      borderRadius={2}
      bgcolor={"#FFFCFC"}
      overflow={'hidden'}
      >
        {
          chats && chats.map((chat) => {
            return (
              <Box
              display={'flex'}
              onClick={() => selectChatHandler(chat)}
              width={'90%'}
              flexDirection={'column'}
              key={chat._id}
              borderRadius={2}
              boxShadow={"0px 1px 1px rgba(0, 0, 0, 0.1)"}
              padding={1}
              sx={{ cursor:'pointer'}}
              bgcolor= { selectedChat ? (selectedChat._id === chat._id ? "#2CB195" : '#f2f1f0') : '#f2f1f0'}
              color= { selectedChat ? (selectedChat._id === chat._id ? "white" : 'black') : 'black'}
              >
                <Typography sx={{ textTransform: 'capitalize', fontFamily:'Roboto', fontSize:'17px'}} variant='h6'>{ chat.isGroupChat ? chat.chatName : (chat.users[0]._id === user._id ? chat.users[1].name : chat.users[0].name) }</Typography>
                <Typography>{ chat.createdAt }</Typography>
              </Box>
            )
          })
        }
      </Stack>
    </Box>
    </Box>
  )
}

export default MyChats
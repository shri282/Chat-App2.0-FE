import React from 'react'
import { useChatContext } from '../context/ChatProvider'
import { Box, Button, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreateGCModel from '../ui components/CreateGCModel';
import { Avatar } from '@mui/material';
import FullscreenImageModal from '../ui components/FullScreenImageModel';

function MyChats() {
  const { chats, user, setselectedChat, selectedChat } = useChatContext();
  const [imageModalOpen, setImageModalOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState('');

  const handleAvatarClick = (src) => {
    setSelectedImage(src)
    setImageModalOpen(true);
};

  const selectChatHandler = (chat) => {
    setselectedChat(chat);
  }

  return (
    <Box
    width={'30%'}
    height={'650px'}
    bgcolor={'white'}
    borderRadius={2}
    boxShadow={"0px 4px 20px rgba(0, 0, 0, 0.1)"}
    marginLeft={2}
    marginRight={2}
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
      sx={{ overflowY:'auto', scrollbarWidth: 'none' }}
      >
        {
          chats && chats.map((chat) => {
            return (
              <Box
              display={'flex'}
              flexDirection={'row'}
              alignItems={'center'}
              key={chat._id}
              width={'90%'}
              borderRadius={2}
              boxShadow={"0px 1px 1px rgba(0, 0, 0, 0.1)"}
              padding={1}
              sx={{ cursor:'pointer', ":hover":{ backgroundColor: '#2CB195', color:'white',width:'92%',height:'10%'}}}
              bgcolor= { selectedChat ? (selectedChat._id === chat._id ? "#2CB195" : '#f2f1f0') : '#f2f1f0'}
              color= { selectedChat ? (selectedChat._id === chat._id ? "white" : 'black') : 'black'}
              >
                <Avatar
                  sx={{ marginRight: 2, cursor: 'pointer', ":hover":{width:'42px', height:'42px'} }}
                  alt={user.name}
                  src={chat.isGroupChat ? chat.users[0].pic : (chat.users[0]._id === user._id ? chat.users[1].pic : chat.users[0].pic)}
                  imgProps={{
                    loading: 'lazy',
                  }}
                  onClick={() => handleAvatarClick(chat.isGroupChat ? chat.users[0].pic : (chat.users[0]._id === user._id ? chat.users[1].pic : chat.users[0].pic))}
                />

                <Box
                display={'flex'}
                flexDirection={'column'}
                onClick={() => selectChatHandler(chat)} 
                >
                  <Typography sx={{ textTransform: 'capitalize', fontFamily:'Roboto', fontSize:'17px'}} variant='h6'>{ chat.isGroupChat ? chat.chatName : (chat.users[0]._id === user._id ? chat.users[1].name : chat.users[0].name) }</Typography>
                  <Typography>{ chat.createdAt }</Typography>
                </Box>
              </Box>
            )
          })
        }
      </Stack>
    </Box>
    <FullscreenImageModal
    open={imageModalOpen} 
    handleClose={() => setImageModalOpen(false)} 
    imgSrc={selectedImage} 
    alt="Chat Avatar"
    />
    </Box>
  )
}

export default MyChats
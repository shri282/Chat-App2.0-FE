import React from 'react'
import { useChatContext } from '../context/ChatProvider'
import { Box, Button, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreateGCModel from '../ui components/CreateGCModel';
import { Avatar } from '@mui/material';
import FullscreenImageModal from '../ui components/FullScreenImageModel';
import { getChatProfilePic } from '../chatLogics';

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
        <Typography variant='h5' color={'orange'}>My Chats</Typography>
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
                <Box
                width={'97%'}
                key={chat._id}
                display={'flex'}
                flexDirection={'row'}
                alignItems={'center'}
                borderRadius={1}
                padding={1}
                sx={{ cursor:'pointer', ":hover":{ backgroundColor: '#eee', color:'black' }}}
                bgcolor= { selectedChat ? (selectedChat._id === chat._id ? "#eee" : '#fff') : '#fff'}
                >
                  <Avatar
                    sx={{ marginRight: 2, cursor: 'pointer' }}
                    alt={user.name}
                    src={getChatProfilePic(chat, user)}
                    imgProps={{
                      loading: 'lazy',
                    }}
                    onClick={() => handleAvatarClick(getChatProfilePic(chat, user))}
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
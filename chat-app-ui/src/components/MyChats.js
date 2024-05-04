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
      width={'40%'}
      height={'87vh'}
      display={'flex'}
      flexDirection={'column'}
      borderRight={'1px solid #E0DFDF'}
      bgcolor={'white'}
      boxShadow={"0px 4px 20px rgba(0, 0, 0, 0.1)"}
      overflow={'hidden'}
    >
      <Box
        width={'95%'}
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
        <Stack
          width={'100%'}
          height={'90%'}
          bgcolor={"#FFFCFC"}
          overflow={'hidden'}
          sx={{ overflowY:'auto' }}
        >
          {
            chats && chats.map((chat) => {
              return (
                <Box
                width={'100%'}
                key={chat._id}
                display={'flex'}
                flexDirection={'row'}
                alignItems={'center'}
                border={'0.5px solid #E0DFDF'}
                boxShadow={"0px 1px 1px rgba(0, 0, 0, 0.1)"}
                padding={1}
                sx={{ cursor:'pointer', ":hover":{ backgroundColor: '#eee', color:'black' }}}
                bgcolor= { selectedChat ? (selectedChat._id === chat._id ? "#eee" : '#fff') : '#fff'}
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
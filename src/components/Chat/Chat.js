import React from 'react'
import { Box, Typography, Avatar } from '@mui/material';
import { getChatName, getRecentChatDate, getChatProfilePic, getNotificationCount } from '../../chatLogics';
import { useChatContext } from '../../context/ChatProvider';
import FullscreenImageModal from '../../ui components/FullScreenImageModel';

function Chat({ chatData }) {

  const [imageModalOpen, setImageModalOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState(0); 
  const { user, setselectedChat, selectedChat, allNotifications } = useChatContext();

  React.useEffect(() => {
    const count = getNotificationCount(chatData._id, allNotifications);
    setNotifications(count);
  },[allNotifications,chatData]);

  return (
    <>
        <Box
         width={'97%'}
         display={'flex'}
         flexDirection={'row'}
         alignItems={'center'}
         borderRadius={1}
         padding={1}
         sx={{ cursor:'pointer', ":hover":{ backgroundColor: '#eee', color:'black' }}}
         bgcolor= { selectedChat ? (selectedChat._id === chatData._id ? "#eee" : '#fff') : '#fff'}
        >
            <Avatar
              sx={{ marginRight: 2, cursor: 'pointer' }}
              alt={user.name}
              src={getChatProfilePic(chatData, user)}
              imgProps={{
                  loading: 'lazy',
              }}
              onClick={() => setImageModalOpen(true)}
            />

            <Box
             display={'flex'}
             flexDirection={'column'}
             width={'100%'}
             onClick={() => setselectedChat(chatData)} 
            >
                <Box
                  display={'flex'}
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Typography sx={{ textTransform: 'capitalize', fontFamily:'Roboto', fontSize:'17px'}} variant='h6'>{ getChatName(chatData, user)}</Typography>
                  <Typography variant='caption' style={{ color: 'grey' }}>{ getRecentChatDate(chatData?.latestMessage?.createdAt)}</Typography>
                </Box>
                <Box
                  display={'flex'}
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Typography sx={{ fontSize:'14px' }}>{ chatData?.latestMessage?.content }</Typography>
                  { 
                    notifications > 0 &&
                    <Typography textAlign={'center'} minWidth={18} minHeight={18} sx={{ fontSize:'12px', color:'white', backgroundColor:'red', borderRadius:'10px' }}>
                        { notifications }
                    </Typography>
                  }
                </Box>
            </Box>
        </Box>

      <FullscreenImageModal
        open={imageModalOpen} 
        handleClose={() => setImageModalOpen(false)} 
        imgSrc={getChatProfilePic(chatData, user)} 
        alt="Chat Avatar"
      />
    </>
)
  
}

export default Chat;
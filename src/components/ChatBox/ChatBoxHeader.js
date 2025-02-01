import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material';
import { useChatContext } from '../../context/ChatProvider';
import { Avatar } from '@mui/material';
import { getChatProfilePic } from '../../chatLogics';
import ChatMenu from '../../ui components/ChatMenu';
import FullscreenImageModal from '../../ui components/FullScreenImageModel';

const InnerBox = styled('Box')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 6px;
  background-color: #f0f2f5;
`;

function ChatBoxHeader() {
    const { selectedChat, user } = useChatContext();
    const [openImageModel, setOpenImageModel] = useState(false);

  return (
    <InnerBox>
        <Box
          display={'flex'}
          alignItems={'center'}
        >
          <Avatar
            sx={{ marginRight: 2, cursor: 'pointer' }}
            alt={selectedChat.users[0].name}
            src={getChatProfilePic(selectedChat, user)}
            imgProps={{
              loading: 'lazy',
            }}
            onClick={() => setOpenImageModel(true)}
          />
          <Typography textTransform={'capitalize'}>{selectedChat.isGroupChat ? selectedChat.chatName : (selectedChat.users[0]._id === user._id ? selectedChat.users[1].name : selectedChat.users[0].name)}</Typography>
        </Box>
        <ChatMenu />
        <FullscreenImageModal
            open={openImageModel} 
            handleClose={() => setOpenImageModel(false)} 
            imgSrc={getChatProfilePic(selectedChat, user)} 
            alt="Chat Avatar"
          />
    </InnerBox>
  )
}

export default ChatBoxHeader
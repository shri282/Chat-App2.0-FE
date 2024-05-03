import React from 'react'
import { Box, Typography } from '@mui/material'
import ChatMenu from './ChatMenu';

function ChatBox() {

  return (
    <Box
    width={'100%'}
    height={'650px'}
    bgcolor={'white'}
    borderRadius={2}
    boxShadow={"0px 4px 20px rgba(0, 0, 0, 0.1)"}
    marginLeft={1}
    marginRight={2}
    marginBottom={2}
    marginTop={2}
    overflow={'hidden'}
    >
      <Box
      display={'flex'}
      flexDirection={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
      padding={1}
      bgcolor={'lightgray'}
      >
        <Typography>chatname</Typography>
        <ChatMenu />
      </Box>
      
    </Box>
  )
}

export default ChatBox;
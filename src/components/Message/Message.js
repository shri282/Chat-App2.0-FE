import React from 'react'
import { getTime } from '../../chatLogics';
import { Box, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useChatContext } from '../../context/ChatProvider';

function Message({ chat, message }) {

  const { user } = useChatContext();

  return (
    message.sender._id === user._id ? 
        (<Box 
            display={'flex'} 
            flexDirection={'column'}
            alignSelf={'flex-end'}
            width={'fit-content'}
            maxWidth={'70%'}
            bgcolor={'#d9fdd3'}
            sx={{ padding: '5px', borderRadius: '3px', margin: '8px', marginLeft:'46%', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}
          >
            <Typography marginRight={10} variant="body1">{message.content}</Typography>
            <Box display={'flex'} alignSelf={'flex-end'} alignItems={'center'}>
              <Typography alignSelf={'flex-end'} marginRight={0.5} variant="caption" style={{ fontSize: '0.7rem', color: 'grey' }}>{getTime(message.createdAt)}</Typography>
              {
                chat.isGroupChat ? <DoneAllIcon sx={{ color: '#34baeb', fontSize: 18 }} />
                : 
                (message.readBy.length > 0 ? <DoneAllIcon sx={{ color: '#34baeb', fontSize: 18 }} /> : <CheckIcon sx={{ color: 'gray', fontSize: 18 }} />)
              } 
            </Box>
        </Box>) 
            : 
        (<Box 
            display={'flex'} 
            flexDirection={'column'}
            alignSelf={'flex-start'}
            width={'fit-content'}
            maxWidth={'70%'}
            bgcolor={'white'}
            sx={{ padding: '5px', borderRadius: '3px', margin: '8px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}
        >
            <Typography marginRight={10} variant="body1">{message.content}</Typography>
            <Typography alignSelf={'flex-end'} variant="caption" style={{ fontSize: '0.7rem', color: 'grey' }}>{getTime(message.createdAt)}</Typography>
        </Box>)
  )
}

export default Message
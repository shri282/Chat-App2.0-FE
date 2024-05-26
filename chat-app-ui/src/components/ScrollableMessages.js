import React from 'react';
import { getTime } from '../chatLogics';
import { Box, Typography } from '@mui/material';
import { useChatContext } from '../context/ChatProvider';

function ScrollableMessages({ messages, messageRef }) {

  const { user } = useChatContext();

  React.useLayoutEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [messages,messageRef]);

  return (
    <Box
     display={'flex'}
     overflow={'auto'}
     flexGrow={2}
     ref={messageRef}
     flexDirection={'column'}
     sx={{ 
      backgroundImage: 'url(/images/kristina-kashtanova-EwpUsHDmEwg-unsplash.jpg)', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center',
      scrollbarWidth: 'none',
     }}
    >

      {messages && messages.map((message, index) => {
        return message.sender._id === user._id ? 
        (<Box 
            display={'flex'} 
            flexDirection={'column'}
            alignSelf={'flex-end'}
            width={'fit-content'}
            maxWidth={'70%'}
            bgcolor={'#d9fdd3'}
            sx={{ padding: '5px', borderRadius: '3px', margin: '8px', marginLeft:'46%', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}
            key={index}   
          >
            <Typography marginRight={10} variant="body1">{message.content}</Typography>
            <Typography alignSelf={'flex-end'} variant="caption" style={{ fontSize: '0.7rem', color: 'grey' }}>{getTime(message.createdAt)}</Typography>
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
            key={index}   
        >
            <Typography marginRight={10} variant="body1">{message.content}</Typography>
            <Typography alignSelf={'flex-end'} variant="caption" style={{ fontSize: '0.7rem', color: 'grey' }}>{getTime(message.createdAt)}</Typography>
        </Box>)
               
      })}
    </Box>
  )
}

export default ScrollableMessages;
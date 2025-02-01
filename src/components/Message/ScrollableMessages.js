import React from 'react';
import { Box } from '@mui/material';
import Message from './Message';

function ScrollableMessages({ messages, messageRef, chat }) {

  React.useLayoutEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [messages, messageRef]);

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
      {
        messages && messages.map((message, index) => {
          return <Message key={index} message={message} chat={chat}/>         
        })
      }
    </Box>
  )
}

export default ScrollableMessages;
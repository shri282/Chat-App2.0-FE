import React from 'react';
import { getTime } from '../chatLogics';
import { Box, Typography } from '@mui/material';
import ScrollableFeed from 'react-scrollable-feed';
import { useChatContext } from '../context/ChatProvider';

function ScrollableMessages({ messages }) {

  const { user } = useChatContext();

  return (
    <ScrollableFeed>
        {messages && messages.map((message, index) => {
            return message.sender._id === user._id ? 
                (<Box 
                    display={'flex'} 
                    flexDirection={'column'}
                    flexGrow={1}
                    // width={'50%'}  
                    alignItems={'flex-end'}
                    bgcolor={'#d9fdd3'}
                    sx={{ padding: '8px', borderRadius: '8px', margin: '8px', marginLeft:'46%', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}
                    key={index}   
                >
                    <Typography display={'inline-block'} variant="body1">{message.content}</Typography>
                    <Typography display={'inline-block'} variant="caption" style={{ fontSize: '0.7rem', color: 'grey' }}>{getTime(message.createdAt)}</Typography>
                </Box>) 
                : 
                (<Box 
                    display={'flex'} 
                    flexDirection={'column'}
                    width={'50%'}
                    alignItems={'flex-start'}
                    bgcolor={'white'}
                    sx={{ padding: '8px', borderRadius: '8px', margin: '8px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}
                    key={index}   
                >
                    <Typography display={'inline-block'} variant="body1">{message.content}</Typography>
                    <Typography display={'inline-block'} variant="caption" style={{ fontSize: '0.7rem', color: 'grey' }}>{getTime(message.createdAt)}</Typography>
                </Box>)
                 
        })}
    </ScrollableFeed>
  )
}

export default ScrollableMessages;
import React, { useCallback, useEffect, useState, useRef } from 'react'
import { useChatContext } from '../../context/ChatProvider';
import { styled } from '@mui/material';
import axios from '../../config/axios';
import ScrollableMessages from '../Message/ScrollableMessages';
import socket from '../../socket/socket';
import NoChatSelected from '../NoChatSelected';
import ChatBoxHeader from './ChatBoxHeader';
import ChatBoxActions from './ChatBoxActions';

const OuterBox = styled('Box')`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  overflow: hidden;
`

function ChatBox() {
  
  const { selectedChat, accessToken, setAllNotifications } = useChatContext();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messageRef = useRef(null);

  const fetchMessages = useCallback(async() => {
    if(!selectedChat) return;
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
      const { data } = await axios.get(`/api/messages/${selectedChat._id}`, config);
      setMessages(data);
    } catch(error) {
      console.log(error);
    }
  }, [selectedChat, accessToken]);

  const sentMessageHandler = async(event) => {
      if(event.key !== 'Enter' && event.type !== 'click') return;
      try {
        if(message.trim() === '' || !selectedChat) return;
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        }
        setMessage('');
        const { data } = await axios.post('/api/messages/sentMessage', {
          chatId: selectedChat._id,
          message,
        }, config);
        setMessages([...messages, data]);
        messageRef.current.scrollTop = messageRef.current.scrollHeight;
      } catch(error) {
        console.log(error);
      }
  }
  
  useEffect(() => {
    setAllNotifications((prevNotifications) => {
      return prevNotifications.filter((notifi) => notifi.chatId !== selectedChat._id);
    })
  },[selectedChat, setAllNotifications]);

  useEffect(() => {
    fetchMessages();
    selectedChat && socket.emit('joinChat', selectedChat._id);
  }, [selectedChat, fetchMessages]);

  useEffect(() => {
    const handleNewMessage = (message) => {
      if (selectedChat && message.chat._id === selectedChat._id) {
        setMessages((prevMessages) => {
          if (prevMessages.some((msg) => msg._id === message._id)) {
            return prevMessages;
          }
          return [...prevMessages, message];
        });
      } else {
        setAllNotifications((prevNotifications) => {
          const newNotifications = [...prevNotifications];
          const chatIndex = newNotifications.findIndex((notification) => notification.chatId === message.chat._id);
          if (chatIndex > -1) {
            newNotifications[chatIndex].count += 1;
          } else {
            newNotifications.push({ chatId: message.chat._id, count: 1 });
          }
          return newNotifications;
        });
      }
    };
    socket.on('newMessage', handleNewMessage);
    
    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [selectedChat, setAllNotifications]);

  
  return (
    <>
    {
      selectedChat ? 
      (
        <OuterBox>
          <ChatBoxHeader />
          <ScrollableMessages messageRef={messageRef} messages={messages} chat={selectedChat} />
          <ChatBoxActions sentMessageHandler={sentMessageHandler} setMessage={setMessage} message={message} />
        </OuterBox>
      ) 
      : <NoChatSelected />
    }
    </>
  )
}

export default ChatBox;
import React, { useCallback, useEffect, useState, useRef } from 'react'
import { useChatContext } from '../../context/ChatProvider';
import { styled } from '@mui/material';
import axios from '../../config/axios';
import ScrollableMessages from '../Message/ScrollableMessages';
import socket from '../../socket/socket';
import NoChatSelected from '../NoChatSelected';
import ChatBoxHeader from './ChatBoxHeader';
import ChatBoxActions from './ChatBoxActions';
import { readBy, newMessage } from '../../socket/socketListeners';

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
  
  const { selectedChat, accessToken, setAllNotifications, user } = useChatContext();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messageRef = useRef(null);


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
      setMessages((prevMessages) => [...prevMessages, data]);
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    } catch(error) {
      console.log(error);
    }
  }

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

  useEffect(() => {
    fetchMessages();
    selectedChat && socket.emit('joinChat', selectedChat._id);
  }, [selectedChat, fetchMessages]);
  
  const updateReadBy = useCallback(async () => {
    if(!selectedChat) return;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    }
    await axios.post(`/api/messages/${selectedChat._id}/readBy`, [], config);
  }, [selectedChat, accessToken]);

  useEffect(() => {
    updateReadBy();
  }, [updateReadBy]);

  useEffect(() => {
    setAllNotifications((prevNotifications) => {
      return prevNotifications.filter((notifi) => notifi.chatId !== selectedChat._id);
    })
  }, [selectedChat, setAllNotifications]);

  useEffect(() => {
    if (messageRef.current) {
      const isAtBottom = messageRef.current.scrollHeight - messageRef.current.scrollTop === messageRef.current.clientHeight;
      if (isAtBottom) {
        messageRef.current.scrollTop = messageRef.current.scrollHeight;
      }
    }
  }, [messages]);

  useEffect(() => {
    const newMessageHandler = newMessage.bind(null, {selectedChat, setAllNotifications, user, setMessages});
    socket.on('newMessage', newMessageHandler);
    
    return () => {
      socket.off('newMessage', newMessageHandler);
    };
  }, [selectedChat, user, setAllNotifications]);

  useEffect(() => {
    const readByHandler = readBy.bind(null, { selectedChat, user, setMessages })
    socket.on('readBy', readByHandler);

    return () => {
      socket.off('readBy', readByHandler);
    };
  }, [selectedChat, user]);
  
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
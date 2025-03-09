import React, { useCallback, useEffect, useState, useRef } from 'react'
import { useChatContext } from '../../context/ChatProvider';
import { styled } from '@mui/material';
import axios from '../../config/axios';
import ScrollableMessages from '../Message/ScrollableMessages';
import socket from '../../socket/socket';
import NoChatSelected from '../NoChatSelected';
import ChatBoxHeader from './ChatBoxHeader';
import ChatBoxActions from './ChatBoxActions';
import { readBy } from '../../socket/socketListeners';
import { getAuthConfig } from '../../chatLogics';

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
  
  const { selectedChat, accessToken, setAllNotifications, user, messages, setMessages } = useChatContext();
  const [message, setMessage] = useState('');
  const messageRef = useRef(null);


  const sentMessageHandler = useCallback(async(event) => {
    if(event.key !== 'Enter' && event.type !== 'click') return;
    if (!message.trim() || !selectedChat) return;

    try {
      setMessage('');
      const { data } = await axios.post(
        '/api/messages/sentMessage',
        { chatId: selectedChat._id, message },
        getAuthConfig(accessToken)
      );

      setMessages((prevMessages) => [...prevMessages, data]);
      selectedChat.latestMessage = data;

      if (messageRef.current) {
        messageRef.current.scrollTop = messageRef.current.scrollHeight;
      }
    } catch(error) {
      console.error(error);
    }
  }, [message, selectedChat, accessToken, setMessages]);

  const fetchMessages = useCallback(async() => {
    if(!selectedChat) return;

    try {
      const { data } = await axios.get(`/api/messages/${selectedChat._id}`, getAuthConfig(accessToken));
      setMessages(data);
    } catch(error) {
      console.error(error);
    }
  }, [selectedChat, accessToken, setMessages]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);


  const updateReadBy = useCallback(async () => {
    if (!selectedChat) return;
    try {
      await axios.post(`/api/messages/${selectedChat._id}/readBy`, [], getAuthConfig(accessToken));
    } catch (error) {
      console.error('Error updating read status:', error);
    }
  }, [selectedChat, accessToken]);

  useEffect(() => {
    updateReadBy();
  }, [updateReadBy]);


  useEffect(() => {
    if (!selectedChat) return;

    setAllNotifications((prev) => {
      if (!prev.has(selectedChat._id)) return prev;
        
      const updatedNotifications = new Map(prev);
      updatedNotifications.delete(selectedChat._id);
      return updatedNotifications;
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
    if (!selectedChat) return;
    
    const readByHandler = (event) => readBy({ selectedChat, user, setMessages }, event);
    socket.on('readBy', readByHandler);

    return () => socket.off('readBy', readByHandler);
  }, [selectedChat, user, setMessages]);
  
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
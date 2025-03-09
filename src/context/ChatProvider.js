import React, { useEffect, useContext, useCallback, useState } from 'react'
import { createContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../config/axios'

const chatContext = createContext();

const ChatProvider = ({ children }) => {

  const [user, setUser] = React.useState(null);
  const [accessToken, setAccessToken] = React.useState(null);
  const [chats, setChats] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [selectedChat, setselectedChat] = React.useState(null);
  const [messages, setMessages] = useState([]);
  const [allNotifications, setAllNotifications] = React.useState(new Map());
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = localStorage.getItem("accessToken");
    if(user && accessToken) {
      setUser(user);
      setAccessToken(accessToken);
      return;
    }
    navigate("/");
  }, [location.pathname, navigate]);


  const fetchChats = useCallback(async() => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
      const fetchChats = await axios.get("/api/chats/fetchChats", config);
      setChats(fetchChats.data);
    } catch (error) {
      console.error(error);
    }
  },[accessToken]);

  const fetchUsers = useCallback(async() => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }  
      }
      // API call to get users
      const { data } = await axios.get("/api/users/fetchUsers", config);
      setUsers(data);   
    } catch(error) {
      console.error(error);
    }
  },[accessToken]);

  useEffect(() => {
    if(!accessToken) return;
    fetchChats();
  },[accessToken, fetchChats]);

  useEffect(() => {
    if(!accessToken) return;
    fetchUsers();
  },[accessToken, fetchUsers]);

  return (
    <chatContext.Provider value={
      { 
        user, 
        setselectedChat, 
        selectedChat, 
        users, 
        setUser, 
        accessToken, 
        setAccessToken, 
        chats, 
        setChats,
        allNotifications,
        setAllNotifications,
        messages,
        setMessages
      }}>
      { children }
    </chatContext.Provider>
  )
}

export const useChatContext = () => {
  return useContext(chatContext);
}

export default ChatProvider;
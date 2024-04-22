import React, { useEffect, useContext, useCallback } from 'react'
import { createContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../config/axios'

const chatContext = createContext();

const ChatProvider = ({ children }) => {

  const [user, setUser] = React.useState(null);
  const [accessToken, setAccessToken] = React.useState(null);
  const [chats, setChats] = React.useState([]);
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
      console.log("fetchchats", fetchChats.data);
    } catch (error) {
      console.log(error);
    }
  },[accessToken]);

  useEffect(() => {
    if(!accessToken) return;
    fetchChats();
  },[accessToken, fetchChats])

  return (
    <chatContext.Provider value={{ user, setUser, accessToken, setAccessToken, chats, setChats}}>
      { children }
    </chatContext.Provider>
  )
}

export const useChatContext = () => {
  return useContext(chatContext);
}

export default ChatProvider;
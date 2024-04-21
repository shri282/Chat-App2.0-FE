import React, { useEffect, useContext } from 'react'
import { createContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

const chatContext = createContext();

const ChatProvider = ({ children }) => {

  const [user, setUser] = React.useState(null);
  const [accessToken, setAccessToken] = React.useState(null);
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

  return (
    <chatContext.Provider value={{ user, setUser, accessToken, setAccessToken}}>
      { children }
    </chatContext.Provider>
  )
}

export const useChatContext = () => {
  return useContext(chatContext);
}

export default ChatProvider;
export const readBy = ({ selectedChat, user, setMessages }, { userId, chatId }) => {
  if (userId === user._id || selectedChat._id !== chatId) return;

  setMessages((prevMessages) =>
    prevMessages.map((message) =>
      message.readBy.length === 0 ? { ...message, readBy: [userId] } : message
    )
  );
};

export const newMessage = ({ setChats, selectedChat, setAllNotifications, user, setMessages }, message) => {
  if (message.sender._id === user._id) return;

  if (selectedChat?._id === message.chat._id) {
    setMessages((prevMessages) =>
      prevMessages.some((msg) => msg._id === message._id) ? prevMessages : [...prevMessages, message]
    );
    selectedChat.latestMessage = message;
  } else {
    updateChatsAndNotifications(message, setChats, setAllNotifications);
  }
};

const updateChatsAndNotifications = (message, setChats, setAllNotifications) => {
  setAllNotifications((prevNotifications) => {
    const updatedNotifications = new Map(prevNotifications);
    updatedNotifications.set(message.chat._id, (updatedNotifications.get(message.chat._id) || 0) + 1);
    return updatedNotifications;
  });

  setChats((prevChats) =>
    prevChats.map((chat) =>
      chat._id === message.chat._id ? { ...chat, latestMessage: message } : chat
    )
  );
};
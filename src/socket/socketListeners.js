export const readBy = ({ selectedChat, user, setMessages }, readByEvent) => {
    const { userId, chatId } = readByEvent;
    if (userId === user._id || selectedChat._id !== chatId) return;

    setMessages((prevMessages) => {
      return prevMessages.map((element) => {
        if (element.readBy.length === 0) {
          return { ...element, readBy: [userId] };
        }
        return element;
      });
    })
}

export const newMessage = ({selectedChat, setAllNotifications, user, setMessages}, message) => {
  if (message.sender._id === user._id) return;

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
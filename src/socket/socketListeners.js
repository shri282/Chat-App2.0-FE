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
      if (prevNotifications.has(message.chat._id)) {
        prevNotifications.set(message.chat._id, prevNotifications.get(message.chat._id) + 1);
      } else {
        prevNotifications.set(message.chat._id, 1);
      }

      return new Map(prevNotifications);
    });
  }


   
};
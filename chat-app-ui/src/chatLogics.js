export const getTime = (date) => {
    const dateTime = new Date(date);
    return dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toUpperCase();
}


export const getChatProfilePic = (chat, user) => {
    return chat.isGroupChat ? '/images/group.jpg' : 
        (chat.users[0]._id === user._id ? chat.users[1].pic : chat.users[0].pic);
}

export const getChatName = (chat, user) => {
    return chat.isGroupChat ? chat.chatName : 
        (chat.users[0]._id === user._id ? chat.users[1].name : chat.users[0].name);
}

export const getRecentChatDate = (chatDate) => {
    const dateNow = new Date();
    const latestMessageDate = new Date(chatDate);
    const diff = dateNow - latestMessageDate;
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    return diffDays >= 1 ? latestMessageDate.toDateString() : getTime(latestMessageDate);   
}

export const getNotificationCount = (chatId, allNotifications) => {
    console.log('in get notifications');
    const notification = allNotifications.find((notification) => notification.chatId === chatId);
    return notification ? notification.count : 0;
}
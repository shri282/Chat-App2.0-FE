export const getTime = (date) => {
    const dateTime = new Date(date);
    return dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toUpperCase();
}


export const getChatProfilePic = (chat, user) => {
    return chat.isGroupChat ? '/images/group.jpg' : 
        (chat.users[0]._id === user._id ? chat.users[1].pic : chat.users[0].pic)
}
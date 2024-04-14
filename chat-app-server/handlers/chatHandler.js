import Chat from '../models/chat.js';
import User from '../models/user.js';

const openChat = async(req, res) => {
    const { userId } = req.body;

    if(!userId) {
        return res.status(400).json({ message: "User not found" });
    }

    try {
        let chatData = await Chat.find({ 
           isGroupChat: false,
           $and: [
               { users: { $elemMatch: { $eq: userId } } },
               { users: { $elemMatch: { $eq: req.user._id } } }
           ]
        }).populate('users','-password').populate('latestMessage');
    
        chatData = await User.populate(chatData, { path: "latestMessage.sender", select: "-password" });
    
        if(chatData.length > 0) {
            return res.status(200).json(chatData[0]);
        } else {
            let receiverName = (await User.findById(userId).select('name -_id')).name;
            const newChatData = await Chat.create({ 
                isGroupChat: false,
                chatName: receiverName,
                users: [userId, req.user._id] 
            });
            console.log(receiverName);
            const fullChatData = await Chat.findById(newChatData._id).populate('users', '-password');
            return res.status(200).json(fullChatData);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }

}


const fetchChats = async(req, res) => {
    try {
        let chats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
                               .populate('users', '-password')
                               .populate('latestMessage')
                               .populate('groupAdmin', '-password')
                               .sort({ updatedAt: -1 });
    
        chats = await User.populate(chats, { path: "latestMessage.sender", select: "-password" });
        return res.status(200).json(chats);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

const chatHandlers = {
    openChat,
    fetchChats
}

export default chatHandlers;
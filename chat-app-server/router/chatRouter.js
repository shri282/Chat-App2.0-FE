import express from 'express';
import chatHandlers from '../handlers/chatHandler.js';
import authUser from '../middleware/authMiddleware.js';

const chatRouter = express.Router();
const { openChat, fetchChats } = chatHandlers;

chatRouter.get('/openChat', authUser, openChat);
chatRouter.get('/fetchChats', authUser, fetchChats);

export default chatRouter;
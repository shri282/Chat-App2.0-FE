import express from 'express';
import userHandlers from '../handlers/userHandler.js';
const { registerUser, loginUser } = userHandlers;

const router = express.Router();

router.post('/register', registerUser);
router.get('/login', loginUser);

export default router;
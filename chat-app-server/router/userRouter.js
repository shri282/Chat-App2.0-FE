import express from 'express';
import userHandlers from '../handlers/userHandler.js';
import upload from '../config/multer.js';

const router = express.Router();
const { registerUser, loginUser } = userHandlers;

router.post('/register',upload.single('file'), registerUser);
router.get('/login', loginUser);

export default router;
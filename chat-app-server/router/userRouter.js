import express from 'express';
import userHandlers from '../handlers/userHandler.js';
const { registerUser, loginUser } = userHandlers;
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/register',upload.single('file'), registerUser);
router.get('/login', loginUser);

export default router;
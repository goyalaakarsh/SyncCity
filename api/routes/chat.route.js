import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createProjectChatroom } from '../controllers/chat.controller.js';


const router = express.Router();

router.post('/create-project-room', createProjectChatroom);


export default router;
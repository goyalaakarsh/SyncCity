import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createProjectChatroom, getRelevantChannels } from '../controllers/chat.controller.js';


const router = express.Router();

router.post('/create-project-room', createProjectChatroom);
router.get('/get-channels', verifyToken, getRelevantChannels)


export default router;
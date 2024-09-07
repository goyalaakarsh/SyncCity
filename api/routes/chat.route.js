import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createDepartmentChatroom, createProjectChatroom, getRelevantChannels, findAndJoinGroupChannel } from '../controllers/chat.controller.js';


const router = express.Router();

router.post('/create-project-room', createProjectChatroom);
router.get('/get-channels', verifyToken, getRelevantChannels);
router.post('/create-department-room', createDepartmentChatroom);
router.post('/join-channel', findAndJoinGroupChannel)

export default router;
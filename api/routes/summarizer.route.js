import express from 'express';
import { summarizeProject } from '../controllers/summarizer.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/summarize', summarizeProject);

export default router;

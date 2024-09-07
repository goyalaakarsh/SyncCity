import express from 'express';
import { getProjectStats, getProjectTimeline } from '../controllers/dashboard.controller.js'; // Adjust the path as needed

const router = express.Router();

router.get('/project-stats', getProjectStats);
router.get('/project-timeline', getProjectTimeline);

export default router;

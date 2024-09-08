import express from 'express';
import { getProjectStats, getProjectTimeline, getProjectTasks } from '../controllers/dashboard.controller.js'; // Adjust the path as needed

const router = express.Router();

router.get('/project-stats', getProjectStats);
router.get('/project-timeline', getProjectTimeline);

router.get('/project-tasks', getProjectTasks);

export default router;

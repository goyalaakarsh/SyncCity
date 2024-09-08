import express from 'express';
import { createNotifications } from '../controllers/notification.controller.js';

const router = express.Router();

// Route to create notifications
router.post('/create', createNotifications);

export default router;
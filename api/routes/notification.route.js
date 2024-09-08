import express from 'express';
import { createNotifications, getPendingNotifications, updateNotificationStatus } from '../controllers/notification.controller.js';

const router = express.Router();

// Route to create notifications
router.post('/create', createNotifications);
router.get('/pending', getPendingNotifications);
router.patch('/update/:id', updateNotificationStatus);

export default router;
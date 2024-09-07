import express from 'express';
import { createNotification, getNotificationsForAdmin, updateNotificationStatus } from '../controllers/notification.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// Route to create a new notification
router.post('/create', verifyToken, createNotification);

// Route to get notifications for a specific admin (by their department)
router.get('/', verifyToken, getNotificationsForAdmin);

// Route to update the status of a notification (approve or deny)
router.put('/update/:notificationId', verifyToken, updateNotificationStatus);

export default router;

import Notification from '../models/notification.model.js';  // Import your Notification model

export const createNotifications = async (req, res) => {
  try {
      const { resources, projectId } = req.body;
      const notifications = resources.map(resource => ({
          name: resource.name,
          quantity: resource.quantity,
          projectId: projectId,  // Ensure projectId is included
          status: 'Pending'  // Default status
      }));

      const createdNotifications = await Notification.insertMany(notifications);
      res.status(201).json(createdNotifications);
  } catch (error) {
      res.status(500).json({ message: 'Error creating notifications', error: error.message });
  }
};

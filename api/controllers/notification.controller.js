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

export const getPendingNotifications = async (req, res) => {
  try {
      const notifications = await Notification.find({ status: 'Pending' }).populate('projectId');
      res.status(200).json(notifications);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching notifications', error: error.message });
  }
};

// Update notification status
export const updateNotificationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
      const updatedNotification = await Notification.findByIdAndUpdate(id, { status }, { new: true });
      if (!updatedNotification) return res.status(404).json({ message: 'Notification not found' });
      res.status(200).json(updatedNotification);
  } catch (error) {
      res.status(500).json({ message: 'Error updating notification', error: error.message });
  }
};
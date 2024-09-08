import Notification from '../models/notification.model.js';
import Project from '../models/project.model.js';
import Department from '../models/department.model.js';

// Create Notification
export const createNotification = async (req, res) => {
  try {
    const { name, quantity, projectId } = req.body;

    // Get the project and associated departments
    const project = await Project.findById(projectId).populate('depId');
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Create notifications for each associated department
    const notifications = project.depId.map(dep => ({
      name,
      quantity,
      projectId,
      depId: dep._id,
    }));

    await Notification.insertMany(notifications);

    res.status(201).json({ message: 'Notifications created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create notifications' });
  }
};

// Get Notifications for Admin (Based on their departments)
export const getNotificationsForAdmin = async (req, res) => {
  try {
    const { userId } = req.user; // Assuming userId is in req.user from auth middleware

    // Find departments where the current user is the admin
    const departments = await Department.find({ adminId: userId });
    const depIds = departments.map(dep => dep._id);

    // Find notifications for those departments
    const notifications = await Notification.find({ depId: { $in: depIds } }).populate('projectId depId');

    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};

// Approve or Deny Notification
export const updateNotificationStatus = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const { status } = req.body;

    // Update notification status
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { status },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update notification status' });
  }
};

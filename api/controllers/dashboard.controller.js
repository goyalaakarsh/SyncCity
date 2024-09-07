import Project from '../models/project.model.js'; // Adjust the path as needed
import { errorHandler } from "../utils/error.js";

// Controller function to get project statistics
export const getProjectStats = async (req, res) => {
    try {
        const inProgressCount = await Project.countDocuments({ state: 0 });
        console.log(inProgressCount);
        const completedCount = await Project.countDocuments({ state: 1 });

        res.json({
            inProgress: inProgressCount,
            completed: completedCount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProjectTimeline = async (req, res) => {
    try {
        const projects = await Project.find({
            startDate: { $ne: null }, // Ensure startDate is not null
            endDate: { $ne: null }    // Ensure endDate is not null
        }).select('name startDate endDate'); // Select only relevant fields

        const projectTimeline = projects.map(project => ({
            name: project.name,
            startDate: project.startDate,
            endDate: project.endDate
        }));

        res.json(projectTimeline);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
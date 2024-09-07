import Project from '../models/project.model.js'; // Adjust the path as needed
import Task from '../models/task.model.js'; // Adjust the path as needed
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

export const getProjectTasks = async (req, res) => {
    try {
        // Fetch all projects
        const projects = await Project.find({});

        console.log(projects);

        // Prepare an array to hold project timeline data
        const projectTasks = [];

        // Iterate through each project to fetch its task counts
        for (const project of projects) {
            // Destructure project details
            const { _id, name, startDate, endDate } = project;

            // Fetch task counts for the current project
            const completedTasksCount = await Task.countDocuments({ projectId: _id, status: 'completed' });
            const inProgressTasksCount = await Task.countDocuments({ projectId: _id, status: 'in-progress' });

            // Push the collected data to the array
            projectTasks.push({
                name,
                completedTasks: completedTasksCount,
                inProgressTasks: inProgressTasksCount,
                startDate,
                endDate
            });
        }

        console.log(projectTasks);



        // Send the aggregated project timeline data as a JSON response
        res.json(projectTasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
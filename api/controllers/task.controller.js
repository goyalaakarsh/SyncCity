import { errorHandler } from "../utils/error.js";
import Task from "../models/task.model.js";
import Project from "../models/project.model.js";

export const getTask = async (req, res, next) => {
    const taskId  = req.params.id;
    console.log(taskId);
    

    try {
        // Find the task by ID
        const task = await Task.findById(taskId).populate('projectId'); // Populate project details if needed
        
        // Check if the task exists
        if (!task) {
            return next(errorHandler(404, "Task not found"));
        }

        // Respond with the found task
        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
};

export const getTasksByProjectId = async (req, res, next) => {
    const { projectId } = req.query;

    try {
        // Ensure projectId is provided
        if (!projectId) {
            return res.status(400).json({ message: 'Project ID is required' });
        }

        // Get task counts based on projectId
        const completedTasksCount = await Task.countDocuments({ projectId, state: 1 }); // completed tasks
        const inProgressTasksCount = await Task.countDocuments({ projectId, state: 0 }); // in-progress tasks

        // Respond with the counts
        res.status(200).json({ completedTasks: completedTasksCount, inProgressTasks: inProgressTasksCount });
    } catch (error) {
        next(error);
    }
};

export const createTask = async (req, res, next) => {

    const {name, deadline, state, projectId} = req.body;

    try{

        if (!name || !deadline || !projectId) {
            return next(errorHandler(400, "Missing required fields: name, deadline, or projectId"));
        }

        if (![0, 1].includes(state)) {
            return next(errorHandler(400, "Invalid state value"));
        }
        
        const newTask = new Task({
            name, 
            state, 
            deadline: new Date(deadline), // date format YYYY-MM-DD
            projectId
        })

        // Save the task to the database
        const savedTask = await newTask.save();

        // Respond with the saved task
        res.status(201).json(savedTask);

    }catch(error) {
        next(error);
    }

}

export const updateTask = async (req, res, next) => {

    const taskId = req.params.id;
    console.log(taskId);
    
    const { name, state, deadline, projectId } = req.body;

    try {
        // Find the task by ID
        const task = await Task.findById(taskId);
        
        // Check if the task exists
        if (!task) {
            return next(errorHandler(404, "Task not found"));
        }

        // Validate the state if it's being updated
        if (state !== undefined && ![0, 1].includes(state)) {
            return next(errorHandler(400, "Invalid state value"));
        }

        // Update the task fields if provided
        if (name) task.name = name;
        if (state !== undefined) task.state = state;
        if (deadline) task.deadline = new Date(deadline); // Ensure the deadline is parsed as a Date object
        if (projectId) task.projectId = projectId;

        // Save the updated task
        const updatedTask = await task.save();

        // Respond with the updated task
        res.status(200).json(updatedTask);
    } catch (error) {
        next(error);
    }

}


export const deleteTask = async (req, res, next) => {
    
    const taskId  = req.params.id;

    try {
        // Find the task by ID
        const task = await Task.findById(taskId);
        
        // Check if the task exists
        if (!task) {
            return next(errorHandler(404, "Task not found"));
        }

        // Delete the task
        await task.deleteOne();

        // Respond with a success message
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        next(error);
    }
};

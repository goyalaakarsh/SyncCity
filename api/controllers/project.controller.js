import Project from "../models/project.model.js";
import User from "../models/user.model.js";
import Task from "../models/task.model.js";
import { errorHandler } from "../utils/error.js";

// Get Project Details
export const getProjectDetails = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return next(errorHandler(404, 'Project not found!'));

        res.status(200).json(project);
    } catch (err) {
        next(err);
    }
};

// Create a New Project
export const createProject = async (req, res, next) => {
    try {
        // Check if managerId is provided and is a valid ObjectId
        // if (!managerId) {
        //     return res.status(400).json({ message: 'Invalid or missing managerId' });
        // }

        // if (!req.body.managerId || !mongoose.Types.ObjectId.isValid(req.body.managerId)) {
        //     return next(errorHandler(400, 'Invalid or missing managerId'));
        // }

        console.log("in create project");
        console.log(req);


        const newProject = new Project({
            name: req.body.name,
            description: req.body.description,
            location: req.body.location,
            startDate: new Date(req.body.startDate), // date format 'YYYY-MM-DD'
            endDate: new Date(req.body.endDate), // date format 'YYYY-MM-DD'
            state: req.body.state,
            depId: req.body.depId,
            managerId: req.body.managerId // This should now be validated
        });

        const savedProject = await newProject.save();

        res.status(201).json(savedProject);
    } catch (error) {
        next(error);
    }
};

// Update Project
export const updateProject = async (req, res, next) => {
    const updateData = req.body;

    try {
        if (req.user.role >= 2) {
            return next(errorHandler(401, "User not authorized for project updates"));
        }

        const updatedProject = await Project.findByIdAndUpdate(req.params.id, updateData, {
            new: true,             // Return the updated document
            runValidators: true    // Ensure the updated fields pass the schema's validators
        });

        if (!updatedProject) {
            return next(errorHandler(404, 'Project not found'));
        }

        res.status(200).json(updatedProject);

    } catch (error) {
        next(error);
    }
};

// Delete Project
export const deleteProject = async (req, res, next) => {
    try {
        if (req.user.role >= 2) {
            return next(errorHandler(401, "User not authorized for project deletion"));
        }

        const project = await Project.findById(req.params.id);
        if (!project) {
            return next(errorHandler(404, 'Project not found'));
        }

        await Project.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Project deleted successfully' });

    } catch (error) {
        next(error);
    }
};

// Get Project Members
export const getProjectMembers = async (req, res, next) => {
    try {
        const members = await User.find({ projectId: { $in: [req.params.id] } });
        
        if (!members || members.length === 0) {
            return next(errorHandler(404, 'No members found for this project'));
        }

        res.status(200).json(members);
    } catch (err) {
        next(err);
    }
};


// Get all Projects
export const getProjects = async (req, res, next) => {

    try{

        const projects = await Project.find({});

        if (!projects) {
            return next(errorHandler(404, 'Cannot Fetch Projects'));
        }

        res.json(projects);

    }catch(err){
        next(err);
    }

}


export const getProjectTasks = async (req, res, next) => {

    try{
        const projectId  = req.params.id;
        console.log(projectId);
        
        const tasks = await Task.find({ projectId });

        if (!tasks.length) {
            return res.status(404).json({ message: 'No tasks found for this project.' });
        }
        
        res.status(200).json(tasks);

    }catch(err){
        next(err);
    }

}

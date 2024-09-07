import Project from "../models/project.model.js";
import User from "../models/user.model.js";
import Task from "../models/task.model.js";
import { errorHandler } from "../utils/error.js";
import mongoose from 'mongoose'; // Import mongoose for ID validation

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
// export const createProject = async (req, res, next) => {
//     try {
        
//         if (!req.body.managerId || !mongoose.Types.ObjectId.isValid(req.body.managerId)) {
//             return next(errorHandler(400, 'Invalid or missing managerId'));
//         }

//         // Validate depId (ensure it's an array of valid ObjectIds)
//         if (!req.body.depId || !req.body.depId.every(id => mongoose.Types.ObjectId.isValid(id))) {
//             return next(errorHandler(400, 'Invalid or missing depId(s)'));
//         }

//         console.log("in create project");
//         console.log(req);


//         const newProject = new Project({
//             name: req.body.name,
//             description: req.body.description,
//             location: req.body.location || 'Not Available',
//             startDate: new Date(req.body.startDate), // date format 'YYYY-MM-DD'
//             endDate: new Date(req.body.endDate), // date format 'YYYY-MM-DD'
//             state: req.body.state || 0,
//             depId: req.body.depId,
//             managerId: req.body.managerId // This should now be validated
//         });

//         const savedProject = await newProject.save();

//         res.status(201).json(savedProject);
//     } catch (error) {
//         next(error);
//     }
// };

export const createProject = async (req, res, next) => {
    try {
        const { name, description, location, startDate, endDate, depId, managerId } = req.body;

        // Validate required fields
        if (!name || !description || !startDate || !endDate || !managerId) {
            return res.status(400).json({ message: 'All required fields must be provided' });
        }

        const newProject = new Project({
            name,
            description,
            location: location || "Not Available",
            startDate,
            endDate,
            depId: depId || [], // Handle as an array
            managerId
        });

        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        console.error('Error creating project:', error);
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
        
        res.status(200).json(tasks);

    }catch(err){
        next(err);
    }

}

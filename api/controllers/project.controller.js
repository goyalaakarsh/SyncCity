import Project from "../models/project.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";


export const getProjectDetails = async (req, res, next) => {

    try{
        const project = await Project.findById(req.params.id);
        if(!project) return next(errorHandler(404, 'Project not found!'));
        
        res.status(200).json(project);
    
    }catch(err) {
        next(err);
    }

}



export const createProject = async (req, res, next) => {
    try{

        console.log(req.user);

        if(req.user.role >= 2 || req.user.role < 1) return next(errorHandler(401, "User not authorized for project creation"));

        const newProject = new Project({
            name: req.body.name,
            description: req.body.description,
            location: req.body.location,
            startDate: new Date(req.body.startDate), // date format 'YYYY-MM-DD'
            endDate: new Date(req.body.endDate), // date format 'YYYY-MM-DD'
            state: req.body.state,
            depId: req.body.depId,
            managerId: req.body.managerId
        })

        const savedProject = await newProject.save();

        res.status(201).json(savedProject);
    
    }catch (error) {
        next(error);
    }

}


export const updateProject = async (req, res, next) => {

    const updateData = req.body;

    try{
        if(req.user.role >= 2 || req.user.role < 1) return next(errorHandler(401, "User not authorized for project creation"));

        const updatedProject = await Project.findByIdAndUpdate(req.params.id, updateData, {
            new: true,             // Return the updated document
            runValidators: true    // Ensure the updated fields pass the schema's validators
        });

        if (!updatedProject) {
            return next(errorHandler(404, 'Project not found'));
        }

        res.status(200).json(updatedProject);

    }catch(error) {
        next(error);
    }

}


export const deleteProject = async (req, res, next) => {

    try{

        if(req.user.role >= 2 || req.user.role < 1) return next(errorHandler(401, "User not authorized for project creation"));
        
        const project = await Project.findById(req.params.id);
        if (!project) {
            return next(errorHandler(404, 'Project not found'));
        }

        await Project.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Project deleted successfully' });


    }catch(error) {
        next(error);
    }

}



export const getProjectMembers = async (req, res, next) => {

    try{

        const members = await User.find({ projectId: { $in: [req.params.id] } });
        console.log(members);
        
        if(!members || members.length === 0) {
            return next(errorHandler(404, 'No members are found for this project'));
        }
        res.status(200).json(members);

    }catch(err){
        next(err);
    }

} 
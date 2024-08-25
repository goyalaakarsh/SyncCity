import Department from "../models/department.model.js";
import {errorHandler} from '../utils/error.js';

export const getDepartment = async (req, res, next) => {
    try {
        // Find the department by ID
        const department = await Department.findById(req.params.id).populate('adminId', 'name email');
        if (!department) return next(errorHandler(404, "Department not found"));
        res.status(200).json(department);
    } catch (error) {
        next(error)
    }
}

export const getDepartments = async (req, res, next) => {
    try { //get multiple departments
        const departments = await Department.find();
        res.status(200).json(departments);
    } catch (error) {
        next(error);
    }
};

export const createDepartment = async (req, res, next) => {
    try {
        console.log('User from request:', req.user);  
        
        const newDepartment = new Department({
            depName: req.body.depName,
            depDesc: req.body.depDesc,
            adminId: req.user.id,
            avatar: req.body.avatar || undefined
        })

        const savedDeparment = await newDepartment.save();

        res.status(201).json(savedDeparment);
    
    } catch(error) {
        console.error('Error in createDepartment:', error);
        next(error);
    }

}

export const updateDepartment = async (req, res, next) => {

    try {

        if( req.user.role !== 0){
            return next(errorHandler(403, "You are not authorized to update department"))
        }

        // get department
        const department = await Department.findById(req.params.id);
        if(!department) return next(errorHandler(403, "You are not authorized to update department"));

        const updatedFields = {};
        if (req.body.depName) updatedFields.depName = req.body.depName;
        if (req.body.avatar) updatedFields.avatar = req.body.avatar;

        if(Object.keys(updatedFields).length === 0){
            return next(errorHandler(400, "No update fields provided"));
        }

        const updatedDepartment = await Department.findByIdAndUpdate(req.params.id, {
            $set: updatedFields
        }, { new: true });

        res.status(200).json(updatedDepartment);

    } catch(error) {
        next(error);
    }

}


export const deleteDepartment = async (req, res, next) => {

    try {

        if( req.user.role !== 0){
            return next(errorHandler(403, "You are not authorized to delete department"))
        }

        const department = await Department.findById(req.params.id);
        if(!department) return next(errorHandler(404, "Department not found"));
        const dName = department.depName;

        await Department.findByIdAndDelete(req.params.id);

        res.status(200).json({message: `Department ${dName} has been deleted`})
        
    } catch(error) {
        next(error);
    }

}
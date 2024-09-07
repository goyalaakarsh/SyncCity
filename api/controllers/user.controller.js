import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';

export const getAdmins = async (req, res, next) => {
    console.log("Fetching admins...");
    try {
      const admins = await User.find({ role: 1 }).select('name avatar');
      console.log("Admins found:", admins);
      res.json(admins);
    } catch (error) {
        console.error("Error fetching admins:", error);
      next(error);
    }
};

export const assignProjectToUsers = async (req, res, next) => {
    const { projectId, userIds } = req.body; // userIds is an array of user IDs, including the manager

    try {
        if (!projectId || !userIds || !Array.isArray(userIds)) {
            return next(errorHandler(400, "Invalid request data"));
        }

        // Loop through the userIds and update each user's projectId array
        const updatedUsers = await User.updateMany(
            { _id: { $in: userIds } }, // Select users whose IDs are in the userIds array
            { $addToSet: { projectId: projectId } }, // Add the projectId to their projectId array
            { new: true }
        );

        res.status(200).json({ message: "Users successfully updated with projectId", updatedUsers });
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    if (req.user.role >= 2 && req.user.id !== req.params.id) return next(errorHandler(401, "you can only update your own account"));
    try {
        
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role,
                depId: req.body.depId,
                avatar: req.body.avatar,
            }
        }, {new: true})

        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.user.role >= 2 && req.user.id !== req.params.id) return next(errorHandler(401, "you can only delete your own account"));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json('User has been deleted');
    } catch (error) {
        next(error);
    }    
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
    
        if (!user) return next(errorHandler(404, 'User not found!'));
    
        const {password : pass, ...rest} = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}


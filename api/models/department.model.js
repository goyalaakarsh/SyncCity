import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
    depName: {
        type: String,
        required: true,
        unique: true
    },
    adminId: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
    },

}, {timestamps: true});

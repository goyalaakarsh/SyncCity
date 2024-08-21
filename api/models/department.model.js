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
    }

}, {timestamps: true});

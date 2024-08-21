import mongoose from 'mongoose';
import { type } from 'os';

const userSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: true,
        unique: true,
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {// for roles 0 -> root, 1 -> admin, 2 -> employee
        type: Number,
        required: true,
        default: 2
    },
    depId: {// mongoid for department
        type: String,
        required: true,
    },
    isManager: {
        type: Boolean,
        default: false,
    },
    avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
    },


}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;
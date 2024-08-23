import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
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
    role: {// for roles 0 -> root, 1 -> admin, 2 -> employee, >= 3 -> testing
        type: Number,
        required: true,
        default: 2
    },
    projectId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project'}
    ],
    depId: {// mongoid for department
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        default: "root",
        // required: true
    },
    avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
    },


}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;
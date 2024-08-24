import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
    depName: {
        type: String,
        required: true,
        unique: true
    },
    depDesc: {
        type: String,
        required: true,
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true,
    },
    avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
    }

}, {timestamps: true});

const Department = mongoose.model('Department', departmentSchema);

export default Department;
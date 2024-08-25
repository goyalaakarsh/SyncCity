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
        default: "https://media.istockphoto.com/id/866715034/vector/entrepreneurs-and-business-people-conference-in-modern-meeting-room.jpg?s=612x612&w=0&k=20&c=HViAYHb_7ZXDuoWEM113lHzShRMBFShmHw2LbuwhNJA="
    }

}, {timestamps: true});

const Department = mongoose.model('Department', departmentSchema);

export default Department;
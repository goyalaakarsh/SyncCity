import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
    }, 
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
        default: "Not Available"
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    state: {
        type: Number,
        required: true,
        default: 0
    },
    depId: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true,}
    ],
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, {timestamps: true});

const Project = mongoose.model('Project', projectSchema);

export default Project;
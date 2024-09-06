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
    state: { // 0 -> ongoing 1 -> completed
        type: Number,
        // required: true,
        default: 0
    },
    depId: [
        { //dep id and manager id made false for now
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        // required: true,
    }
    ],
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        default: '66c89c4ca55b8e6d57574695'
    }

}, {timestamps: true});

const Project = mongoose.model('Project', projectSchema);

export default Project;
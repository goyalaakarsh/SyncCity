import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
    },
    state: { // 0 -> in progress, 1 -> completed, 
        type: Number,
        required: true,
        default: 0
    },
    deadline: {
        type: Date,
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    }

}, {timestamps: true});

const Task = mongoose.model('Task', taskSchema);

export default Task;
import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    quantity:{
        type: Number,
        required: true,
        default: 0,
    },
    projectId:{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true
    },
    depId: [
        { //dep id and manager id made false for now
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        // required: true,
    }
    ],
    status: { type: String, enum: ['Pending', 'Approved', 'Denied'], default: 'Pending' },
}, {timestamps: true});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
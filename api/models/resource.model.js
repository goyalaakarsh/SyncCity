import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    quantity:{
        type: Number,
        required: true,
        default: 0,
    }

}, {timestamps: true});

const Resource = mongoose.model('Resource', resourceSchema);

export default Resource;
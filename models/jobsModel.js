import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Company name is require'],
    },
    position: {
        type: String,
        required: [true, 'job position is require'],
        maxlenght: 100
    },
    status: {
        type: String,
        enum: ['pending', 'reject', 'interview'],
        default: 'pending'
    },
    workType: {
        type: String,
        enum: ['Full-time', 'part-time', 'internship', 'contaract'],
        default: 'Full-time'
    },
    workLocation: {
        type: String,
        default: 'delhi',
        required: [true, 'work location required']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
}, { timestamp: true })
export default mongoose.model('job', jobSchema)
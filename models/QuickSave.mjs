import mongoose from 'mongoose';

const quickSaveSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: true, // Index for username
    },
    link: {
        type: String,
        required: true,
    },
    tags: {
        type: [String], // Tags stored as an array of strings
        index: true, // Index for tags
    },
    description: {
        type: String,
    },
    startTime: {
        type: String,
        required: true,
    },
    embedLink: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const QuickSave = mongoose.model('QuickSave', quickSaveSchema);

export default QuickSave;

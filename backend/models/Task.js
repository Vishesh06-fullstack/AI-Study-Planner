const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],  
        default: 'Medium'                  
    },
    completed: {
        type: Boolean,
        default: false                    
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
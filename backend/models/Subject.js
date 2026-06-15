const mongoose = require('mongoose');
const subjectSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    examDate : {
        type : Date,
        required : Date
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
} , {timestamps : true})

const Subject = mongoose.model('Subject' , subjectSchema);
module.exports = Subject;
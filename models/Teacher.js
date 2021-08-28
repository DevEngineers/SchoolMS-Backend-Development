const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
    teacherName: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true,
        trim: true
    },
    nic: {
        type: String,
        required: true
    },
    schoolBranch: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    maritalStatus: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
},{
    timestamps:true
})

let Teacher = mongoose.model('teachers',TeacherSchema);

module.exports = Teacher;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*
*
*
*
*
*

* */

const studentSchema = new Schema({

    studentName:{
        type:String,
        required:true,
        default:''
    },
    guardian:{
        type:String,
        required:true,
        default:''
    },
    phone:{
        type:String,
        required:true,
        default:''
    },
    dob:{
        type:String,
        required:true,
        default:''
    },
    address:{
        type:String,
        required:true,
        default:''
    },
    schoolBranch:{
        type:String,
        required:true,
        default:''
    },
    class:{
        type:String,
        required:true,
        default:''
    },
    classType:{
        type:String,
        required:true,
        default:''
    },
    gender:{
        type:String,
        required:true,
        default:''
    },
},{
    timestamps:true
})

let Student = mongoose.model('Students',studentSchema);

module.exports = Student;

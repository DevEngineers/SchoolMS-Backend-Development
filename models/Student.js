const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({


   studentID:{
        type:String,
        required:true,
        default:''
    },

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
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Branch'
    },
    class:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Class'
    },
    classType:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'ClassType'
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

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
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
    date:{
        type:Date,
        required:true
    },
    student:{
        type:[String],
        required:true,
        default:['']
    },
    attendance:{
        type:[Boolean],
        required:true,
    },
},{
    timestamps:true
})

let Attendance = mongoose.model('Attendance',attendanceSchema);

module.exports = Attendance;
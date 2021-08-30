const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
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
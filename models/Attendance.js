const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    class:{
        type:String,
        required:true,
        default:''
    },
},{
    timestamps:true
})

let Attendance = mongoose.model('Attendance',attendanceSchema);

module.exports = Attendance;
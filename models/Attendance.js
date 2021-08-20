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

let AttendanceSchema = mongoose.model('AttendanceSchema',attendanceSchema);

module.exports = AttendanceSchema;
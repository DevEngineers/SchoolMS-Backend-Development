const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const classTimetableSchema = new Schema({
    class:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Class'
    },
    classType:{
        type:String,
        required:true,
        ref:'ClassType'
    },
    year:{
        type:String,
        required:true,
        default:''
    },
    startSlot:{
        type:[String],
        required:true
    },
    endSlot:{
        type:[String],
        required:true,
    },
    monday:{
        type:[String],
        required:true
    },
    tuesday:{
        type:[String],
        required:true
    },
    wednesday:{
        type:[String],
        required:true
    },
    thursday:{
        type:[String],
        required:true
    },
    friday:{
        type:[String],
        required:true,
        default:['']
    }
},{
    timestamps:true
})


let ClassTimetable = mongoose.model('ClassTimetable',classTimetableSchema);

module.exports = ClassTimetable;
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
        default:''
    },
    year:{
        type:String,
        required:true,
        default:''
    },
    startSlot:{
        type:[String],
        required:true,
        default:['']
    },
    endSlot:{
        type:[String],
        required:true,
        default:['']
    },
    monday:{
        type:[String],
        required:true,
        default:['']
    },
    tuesday:{
        type:[String],
        required:true,
        default:['']
    },
    wednesday:{
        type:[String],
        required:true,
        default:['']
    },
    thursday:{
        type:[String],
        required:true,
        default:['']
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
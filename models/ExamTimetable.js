const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examTimetableSchema = new Schema({
    class:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Class'
    },
    year:{
        type:String,
        required:true,
        default:''
    },
    term:{
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
    examDates:{
        type:[String],
        required:true,
        default:['']
    },
    examSubjects:{
        type:[String],
        required:true,
        default:['']
    }
},{
    timestamps:true
})

let ExamTimetable = mongoose.model('ExamTimetable',examTimetableSchema);

module.exports = ExamTimetable;
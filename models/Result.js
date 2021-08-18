const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new Schema({
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
    studentID:{
        type:String,
        required:true,
        default:''
    },
    grades:{
        type:[String],
        required:true,
        default:['']
    },
    examMarks:{
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

let Result = mongoose.model('Result',resultSchema);

module.exports = Result;
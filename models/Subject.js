const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    subject:{
        type:String,
        required:true,
        default:''
    },
    class:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'classes'
    },
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'teachers'
    },
},{
    timestamps:true
})

let Subject = mongoose.model('Subject',subjectSchema);

module.exports = Subject;
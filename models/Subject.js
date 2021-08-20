const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    class:{
        type:String,
        required:true,
        default:''
    },
},{
    timestamps:true
})

let SubjectSchema = mongoose.model('SubjectSchema',subjectSchema);

module.exports = SubjectSchema;
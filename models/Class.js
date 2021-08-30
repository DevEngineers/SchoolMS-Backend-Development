const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
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
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'teacher'
    },
},{
    timestamps:true
})

let Class = mongoose.model('Class',classSchema);

module.exports = Class;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classTypeSchema = new Schema({
    name:{
        type:String,
        required:''
    }
},{
    timestamps:true
})

let ClassType = mongoose.model('ClassType',classTypeSchema);

module.exports = ClassType;
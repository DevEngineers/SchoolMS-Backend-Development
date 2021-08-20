const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
    class:{
        type:String,
        required:true,
        default:''
    },
},{
    timestamps:true
})

let ClassSchema = mongoose.model('ClassSchema',classSchema);

module.exports = ClassSchema;
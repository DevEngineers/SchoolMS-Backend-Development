const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const branchSchema = new Schema({
    branchName:{
        type:String,
        required:true,
        default:''
    }
},{
    timestamps:true
})

let Branch = mongoose.model('Branch',branchSchema);

module.exports = Branch;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({

    branch:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Branch'
    },
    username:{
        type:String,
        default:'',
        required:true
    },
    email:{
        type:String,
        default:'',
        required:true
    },
    userType:{
        type:String,
        default:'',
        required:true
    },
    status:{
        type:String,
        default:'Active',
    },
    admin:{
        type: Boolean,
        default: false
    },
    password:{
        type:String,
        default:'',
        required:true
    },
},{
    timestamps:true
});

module.exports = mongoose.model('User', User);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({

    branch:{
        type:String,
        default:''
    },
    username:{
        type:String,
        default:''
    },
    email:{
        type:String,
        default:''
    },
    userType:{
        type:String,
        default:''
    },
    admin:{
        type: Boolean,
        default: false
    },
    password:{
        type:String,
        default:''
    },
});

module.exports = mongoose.model('User', User);
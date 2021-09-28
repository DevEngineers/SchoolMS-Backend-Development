const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    schoolBranch: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Branch'
    },
    class: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Class'
    },
    classType: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'ClassType'
    },
    studentId: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Students'
    },
    studentName: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Students'
    },
    paymentType: {
        type: String,
        required: true
    },
    paidAmount: {
        type: Number,
        required: true
    },
    dateOfPayment: {
        type: Date,
        required: true
    },
},{
    timestamps:true
})

let Payment = mongoose.model('payments',paymentSchema);

module.exports = Payment;

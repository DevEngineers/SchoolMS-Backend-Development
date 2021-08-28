const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    schoolBranch: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true,
        trim: true
    },
    classType: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true
    },
    studentName: {
        type: String,
        required: true
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

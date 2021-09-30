const express = require('express');
const bodyParser = require("body-parser");
const Payment = require("../models/Fees");
const feesRouter = express.Router();
const generate = require("../reportModule/reportServices/PaymentReportService");

/**
 * @author : M.A.M Nusky
 * Registration Number : IT19167442
 */

feesRouter.use(bodyParser.json());
feesRouter.route('/')
    .get(async (req,res,next) =>{
        await Payment.find({})
            .populate('studentName')
            .populate('studentId')
            .populate('schoolBranch')
            .populate("class")
            .populate("classType")


            .then((payment) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(payment);
            },(err) =>{
                next(err);
            })
            .catch((err) =>{
                next(err);
            })

    })
    .post(async(req,res,next) =>{
        await Payment.create(req.body)
            .then((payment) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(payment);
            },(err) =>{
                next(err);
            })
            .catch((err) =>{
                next(err);
            })
    });

feesRouter.route('/:id')
    .get(async (req,res,next) => {
        await Payment.findById(req.params.id)
            .populate("class")
            .populate("classType")
            .populate('schoolBranch')
            .populate('studentName')
            .populate('studentId')
            .then((payment) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(payment);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    })
    .put(async (req, res, next) => {
        await Payment.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{ new :true })
            .then((payment) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(payment);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    })
    .delete(async (req, res, next) => {
        await Payment.findByIdAndRemove(req.params.id)
            .then((payment) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(payment);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    });

feesRouter.route("/search/:value")
    .get(async (req,res,next) => {
        console.log("Search value", req.params.value)
        let search = req.params.value;
        await Payment.find({ paymentType: { $regex: '.*' + search.toLowerCase() + '.*', $options: 'i' }}).sort({paymentType: 1})
            .populate("class")
            .populate("classType")
            .populate('schoolBranch')
            .populate('studentName')
            .populate('studentId')
            .then((Payment) => {
                // console.log("get Payment",Payment)
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(Payment);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    });

feesRouter.route('/generate/report')
    .post(async (req, res, next) => {
        let paymentFilter = req.body;
        console.log(paymentFilter)
        await Payment.findOne({studentId:paymentFilter.studentId,class:paymentFilter.class,classType:paymentFilter.classType,paymentType:paymentFilter.paymentType})
            .populate("classType")
            .populate("class")
            .populate('studentId')
            .then(
                (payment) => {
                    generate("./output.pdf",payment)
                    console.log(payment)
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(payment);
                },
                (err) => {
                    next(err);
                }
            )
            .catch((err) => {
                next(err);
            });
    });

module.exports = feesRouter;

const express = require('express');
const bodyParser = require("body-parser");
const Payment = require("../models/Fees");

const feesRouter = express.Router();

feesRouter.use(bodyParser.json());
feesRouter.route('/')
    .get(async (req,res,next) =>{
        await Payment.find({})
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
        await Payment.find({ payment: { $regex: '.*' + search.toLowerCase() + '.*', $options: 'i' }}).sort({payment: 1})
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

module.exports = feesRouter;

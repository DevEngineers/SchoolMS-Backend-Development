const express = require('express');
const bodyParser = require("body-parser");
const Result = require("../models/Result");


const resultsRouter = express.Router();

resultsRouter.use(bodyParser.json());


resultsRouter.route('/')
    .get((req,res,next) =>{
        Result.find({})
            .then((results) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type')
                res.json(results);
            },(err) =>{
                next(err);
            })
            .catch((err) =>{
                next(err);
            })

    })
    .get((req,res,next) => {
        Result.findById(req.params.resultID)
            .then((result) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(result);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    })
    .post((req,res,next) =>{
        Result.create(req.body)
            .then((result) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(result);
            },(err) =>{
                next(err);
            })
            .catch((err) =>{
                next(err);
            })
    })
    .put((req, res, next) => {
        Result.findByIdAndUpdate(req.params.eTimetableID,{
            $set:req.body
        },{ new :true })
            .then((result) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(result);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    })
    .delete((req, res, next) => {
        Result.findByIdAndRemove(req.params.eTimetableID)
            .then((result) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(result);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    });


module.exports = resultsRouter;
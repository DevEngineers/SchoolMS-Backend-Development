const express = require('express');
const bodyParser = require("body-parser");
const Result = require("../models/Result");

/**
 * @author : M.N.M Akeel
 * Registration Number : IT19153414
 */

const resultsRouter = express.Router();

resultsRouter.use(bodyParser.json());


resultsRouter.route('/')
    .get(async (req,res,next) =>{
        await Result.find({})
            .populate('class')
            .populate('classType')
            .then((results) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json')
                res.json(results);
            },(err) =>{
                next(err);
            })
            .catch((err) =>{
                next(err);
            })

    })
    .post(async (req,res,next) =>{
        await Result.create(req.body)
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
    });

resultsRouter.route('/:id')
    .get(async (req,res,next) => {
        await Result.findById(req.params.id)
            .populate('class')
            .populate('classType')
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
    .put(async (req, res, next) => {
        await Result.findByIdAndUpdate(req.params.id,{
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
    .delete(async (req, res, next) => {
        await Result.findByIdAndRemove(req.params.id)
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
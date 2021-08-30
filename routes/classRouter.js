const express = require('express');
const bodyParser = require("body-parser");
const Class = require("../models/Class");

const classRouter = express.Router();

classRouter.use(bodyParser.json());

classRouter.route('/')
    .get(async (req,res,next) =>{
        await Class.find({})
            .populate('classType')
            .populate('teachers')
            .then((Class) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json')
                res.json(Class);
            },(err) =>{
                next(err);
            })
            .catch((err) =>{
                next(err);
            })

    })
    .post(async (req,res,next) =>{
        await Class.create(req.body)
            .then((Class) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Class);
            },(err) =>{
                next(err);
            })
            .catch((err) =>{
                next(err);
            })
    });

classRouter.route('/:id')
    .get(async (req,res,next) => {
        await Class.findById(req.params.id)
            // .populate('teachers')
            // .populate('classType')
            .then((Class) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Class);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    })
    .put(async (req, res, next) => {
        await Class.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{ new :true })
            .then((Class) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Class);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    })
    .delete(async (req, res, next) => {
        await Class.findByIdAndRemove(req.params.id)
            .then((Class) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Class);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    });

module.exports = classRouter;
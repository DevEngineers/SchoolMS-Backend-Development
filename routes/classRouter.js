const express = require('express');
const bodyParser = require("body-parser");
const Class = require("../models/Class");

const classRouter = express.Router();

classRouter.use(bodyParser.json());

classRouter.route('/')
    .get((req,res,next) =>{
        Class.find({})
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
    .post((req,res,next) =>{
        Class.create(req.body)
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
    .get((req,res,next) => {
        Class.findById(req.params.id)
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
    .put((req, res, next) => {
        Class.findByIdAndUpdate(req.params.id,{
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
    .delete((req, res, next) => {
        Class.findByIdAndRemove(req.params.id)
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
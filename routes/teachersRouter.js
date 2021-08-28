const express = require('express');
const bodyParser = require("body-parser");
const Teacher = require("../models/Teacher");
const teachersRouter = express.Router();


teachersRouter.use(bodyParser.json());


teachersRouter.route('/')
    .get(async (req,res,next) =>{
        await Teacher.find({})
            .then((teachers) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(teachers);
            },(err) =>{
                next(err);
            })
            .catch((err) =>{
                next(err);
            })

    })
    .post(async(req,res,next) =>{
        await Teacher.create(req.body)
            .then((teacher) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(teacher);
            },(err) =>{
                next(err);
            })
            .catch((err) =>{
                next(err);
            })
    });

teachersRouter.route('/:id')
    .get(async (req,res,next) => {
        await Teacher.findById(req.params.id)
            .then((teacher) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(teacher);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    })
    .put(async (req, res, next) => {
        await Teacher.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{ new :true })
            .then((teacher) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(teacher);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    })
    .delete(async (req, res, next) => {
        await Teacher.findByIdAndRemove(req.params.id)
            .then((teacher) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(teacher);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    });
module.exports = teachersRouter;

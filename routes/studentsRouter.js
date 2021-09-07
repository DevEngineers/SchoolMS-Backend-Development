const express = require('express');
const bodyParser = require("body-parser");
const Student = require("../models/Student");

const studentsRouter = express.Router();

studentsRouter.use(bodyParser.json());
studentsRouter.route('/')
    .get(async (req,res,next) =>{
        await Student.find({})
            .then((student) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(student);
            },(err) =>{
                next(err);
            })
            .catch((err) =>{
                next(err);
            })

    })
    .post(async(req,res,next) =>{
        await Student.create(req.body)
            .then((student) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(student);
            },(err) =>{
                next(err);
            })
            .catch((err) =>{
                next(err);
            })
    });

studentsRouter.route('/:id')
    .get(async (req,res,next) => {
        await Student.findById(req.params.id)
            .then((student) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(student);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    })
    .put(async (req, res, next) => {
        await Student.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{ new :true })
            .then((student) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(student);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    })
    .delete(async (req, res, next) => {
        await Student.findByIdAndRemove(req.params.id)
            .then((student) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(student);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    });

studentsRouter.route('/getStudentByClass/:class/:classType')
    .get(async (req,res,next) =>{
        await Student.find({class:req.params.class, classType:req.params.classType})
            .then((student) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(student);
            },(err) =>{
                next(err);
            })
            .catch((err) =>{
                next(err);
            })

    });

module.exports = studentsRouter;

const express = require('express');
const bodyParser = require('body-parser');
const ExamTimetable = require('../models/ExamTimetable');

const examTimetableRouter = express.Router();

examTimetableRouter.use(bodyParser.json());


examTimetableRouter.route('/')
    .get((req,res,next) =>{
        ExamTimetable.find({})
            .then((examTimetables) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json')
                res.json(examTimetables);
            },(err) =>{
                next(err);
            })
            .catch((err) =>{
                next(err);
            })

    })
    .post((req,res,next) =>{
        ExamTimetable.create(req.body)
            .then((examTimetable) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(examTimetable);
            },(err) =>{
                next(err);
            })
            .catch((err) =>{
                next(err);
            })
    });

examTimetableRouter.route('/:id')
    .get((req,res,next) => {
        ExamTimetable.findById(req.params.id)
            .then((examTimetable) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(examTimetable);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    })
    .put((req, res, next) => {
        ExamTimetable.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{ new :true })
            .then((examTimetable) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(examTimetable);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    })
    .delete((req, res, next) => {
        ExamTimetable.findByIdAndRemove(req.params.id)
            .then((examTimetable) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(examTimetable);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    });

module.exports = examTimetableRouter;
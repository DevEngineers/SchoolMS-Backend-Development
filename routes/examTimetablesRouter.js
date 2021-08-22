const express = require('express');
const bodyParser = require('body-parser');
const ExamTimetable = require('../models/ExamTimetable');

const examTimetableRouter = express.Router();

examTimetableRouter.use(bodyParser.json());


examTimetableRouter.route('/')
    .get(async (req,res,next) =>{
        await ExamTimetable.find({})
            .populate('class')
            .populate('classType')
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
    .post(async (req,res,next) =>{
        await ExamTimetable.create(req.body)
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
    .get(async (req,res,next) => {
        await ExamTimetable.findById(req.params.id)
            .populate('class')
            .populate('classType')
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
    .put(async (req, res, next) => {
        await ExamTimetable.findByIdAndUpdate(req.params.id,{
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
    .delete(async (req, res, next) => {
        await ExamTimetable.findByIdAndRemove(req.params.id)
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
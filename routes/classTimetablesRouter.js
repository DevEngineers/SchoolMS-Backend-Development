const express = require('express');
const bodyParser = require('body-parser');
const ClassTimetable = require('../models/ClassTimetable');

const classTimetableRouter = express.Router();

classTimetableRouter.use(bodyParser.json());


classTimetableRouter.route('/')
    .get((req,res,next) =>{
        ClassTimetable.find({})
            .then((classTimetables) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type')
                res.json(classTimetables);
            },(err) =>{
                next(err);
            })
            .catch((err) =>{
                next(err);
            })

    })
    .get((req,res,next) => {
        ClassTimetable.findById(req.params.cTimetableID)
            .then((classTimetable) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(classTimetable);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    })
    .post((req,res,next) =>{
        ClassTimetable.create(req.body)
            .then((classTimetable) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(classTimetable);
            },(err) =>{
                next(err);
            })
            .catch((err) =>{
                next(err);
            })
    })
    .put((req, res, next) => {
        ClassTimetable.findByIdAndUpdate(req.params.cTimetableID,{
            $set:req.body
        },{ new :true })
            .then((classTimetable) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(classTimetable);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    })
    .delete((req, res, next) => {
        ClassTimetable.findByIdAndRemove(req.params.cTimetableID)
            .then((classTimetable) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(classTimetable);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    });

module.exports = classTimetableRouter;
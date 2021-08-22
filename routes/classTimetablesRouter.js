const express = require('express');
const bodyParser = require('body-parser');
const ClassTimetable = require('../models/ClassTimetable');

const classTimetableRouter = express.Router();

classTimetableRouter.use(bodyParser.json());


classTimetableRouter.route('/')
    .get( async (req,res,next) =>{
         await ClassTimetable.find({})
            .then((classTimetables) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json')
                res.json(classTimetables);
            },(err) =>{
                next(err);
            })
            .catch((err) =>{
                next(err);
            })

    })
    .post(async (req,res,next) =>{
        await ClassTimetable.create(req.body)
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
    });


classTimetableRouter.route('/:id')
    .get(async (req,res,next) => {
         await ClassTimetable.findById(req.params.id)
            .populate('class')
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
    .put(async (req, res, next) => {
        await ClassTimetable.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{ new :true })
            .then((classTimetable) => {
                res.satusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(classTimetable);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    })
    .delete(async (req, res, next) => {
        await ClassTimetable.findByIdAndRemove(req.params.id)
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
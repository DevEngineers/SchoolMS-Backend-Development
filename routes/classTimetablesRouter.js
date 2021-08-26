const express = require('express');
const bodyParser = require('body-parser');
const ClassTimetable = require('../models/ClassTimetable');

/**
 * @author : M.N.M Akeel
 * Registration Number : IT19153414
 */

const classTimetableRouter = express.Router();

classTimetableRouter.use(bodyParser.json());


classTimetableRouter.route('/')
    .get( async (req,res,next) =>{
         await ClassTimetable.find({})
             .populate('class')
             .populate('classType')
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
        let timetable = req.body
        let newArrayObject = createSubjectObject(timetable)
        let newTimetableOb = changeArrayValues(timetable)

        await ClassTimetable.create(newTimetableOb)
            .then((classTimetable) =>{
                console.log(classTimetable)
                    ClassTimetable.updateOne({_id:classTimetable._id},
                        {$set:{
                            monday:newArrayObject.monday,
                                tuesday:newArrayObject.tuesday,
                                wednesday:newArrayObject.wednesday,
                                thursday:newArrayObject.thursday,
                                friday:newArrayObject.friday
                        }
                    },{useFindAndModify:false})
                    .then((classTimetable) =>{
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(classTimetable);
                    })
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
            .populate('classType')
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
        let timetable = req.body
        let newArrayObject = createSubjectObject(timetable)
        let newTimetableOb = changeArrayValues(timetable)

        await ClassTimetable.findByIdAndUpdate(req.params.id,{
            $set:newTimetableOb
        },{ new :true })
            .then((classTimetable) => {
                ClassTimetable.updateOne({_id:classTimetable._id},
                    {$set:{
                            monday:newArrayObject.monday,
                            tuesday:newArrayObject.tuesday,
                            wednesday:newArrayObject.wednesday,
                            thursday:newArrayObject.thursday,
                            friday:newArrayObject.friday
                        }
                    },{useFindAndModify:false})
                    .then((classTimetable) =>{
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(classTimetable);
                    })
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


function changeArrayValues(timetable) {
    timetable.monday = ['']
    timetable.tuesday = ['']
    timetable.wednesday = ['']
    timetable.thursday = ['']
    timetable.friday = ['']

    return timetable;
}

function createSubjectObject(timetable) {
    let subjects ={
        monday:timetable.monday,
        tuesday:timetable.tuesday,
        wednesday:timetable.wednesday,
        thursday:timetable.thursday,
        friday:timetable.friday
    }
    return subjects;
}

module.exports = classTimetableRouter;
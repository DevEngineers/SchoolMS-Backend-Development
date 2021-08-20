const express = require('express');
const bodyParser = require("body-parser");
const Attendance =require("../models/Attendance");

const attendanceRouter = express.Router();

attendanceRouter.use(bodyParser.json());

attendanceRouter.route('/')
    .get((req,res,next) =>{
        Attendance.find({})
            .then((attendance) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json')
                res.json(attendance);
            },(err) =>{
                next(err);
            })
            .catch((err) =>{
                next(err);
            })

    })
    .post((req,res,next) =>{
        Attendance.create(req.body)
            .then((attendance) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(attendance);
            },(err) =>{
                next(err);
            })
            .catch((err) =>{
                next(err);
            })
    });

attendanceRouter.route('/:id')
    .get((req,res,next) => {
        Attendance.findById(req.params.id)
            .then((attendance) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(attendance);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    })
    .put((req, res, next) => {
        Attendance.findByIdAndUpdate(req.params.id,{
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
        Attendance.findByIdAndRemove(req.params.id)
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

module.exports = attendanceRouter;
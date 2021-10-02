const express = require("express");
const bodyParser = require("body-parser");
const Attendance =require("../models/Attendance");
const generate = require("../reportModule/reportServices/AttendanceReportService");

const attendanceRouter = express.Router();

attendanceRouter.use(bodyParser.json());

attendanceRouter.route("/")
    .get(async (req,res,next) =>{
        await Attendance.find({})
            .populate("class")
            .populate("classType")
            .populate("student")
            .then((attendance) =>{
                res.statusCode = 200;
                res.setHeader("Content-Type","application/json")
                res.json(attendance);
            },(err) =>{
                next(err);
            })
            .catch((err) =>{
                next(err);
            })

    })
    .post(async (req,res,next) =>{
        await Attendance.create(req.body)
            .then((attendance) =>{
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(attendance);
            },(err) =>{
                next(err);
            })
            .catch((err) =>{
                next(err);
            })
    });

attendanceRouter.route("/:id")
    .get(async (req,res,next) => {
        await Attendance.findById(req.params.id)
            .populate("class")
            .populate("classType")
            // .populate('student')
            .then((attendance) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(attendance);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    })
    .put(async (req, res, next) => {
        await Attendance.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{ new :true })
            .then((Class) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(Class);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    })
    .delete(async (req, res, next) => {
        await Attendance.findByIdAndRemove(req.params.id)
            .then((Class) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(Class);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    });

attendanceRouter.route("/search/:value")
    .get(async (req,res,next) => {
        let search = req.params.value;
        await Attendance.find({ date : { $regex: '.*' + search + '.*', $options: 'i' }}).sort({date: 1})
            .populate("class")
            .populate("classType")
            .populate("student")
            .then((attendance) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(attendance);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    });

attendanceRouter.route('/generate/report')
    .post(async (req, res, next) => {
        let attendanceFilter = req.body;
        console.log(attendanceFilter)
        await Attendance.findOne({class:attendanceFilter.class,classType:attendanceFilter.classType,month:attendanceFilter.month})
            .populate("class")
            .populate("classType")
            .populate("student")
            .then(
                (attendance) => {
                    generate("./Attendance Report.pdf",attendance)
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(attendance);
                },
                (err) => {
                    next(err);
                }
            )
            .catch((err) => {
                next(err);
            });
    });

module.exports = attendanceRouter;

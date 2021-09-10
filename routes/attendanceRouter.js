const express = require("express");
const bodyParser = require("body-parser");
const Attendance =require("../models/Attendance");

const attendanceRouter = express.Router();

attendanceRouter.use(bodyParser.json());

attendanceRouter.route("/")
    .get(async (req,res,next) =>{
        await Attendance.find({})
            .populate("class")
            .populate("classType")
            // .populate('student')
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

module.exports = attendanceRouter;
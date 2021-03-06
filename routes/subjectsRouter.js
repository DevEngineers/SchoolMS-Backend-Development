const express = require("express");
const bodyParser = require("body-parser");
const Subject = require("../models/Subject");

const subjectsRouter = express.Router();

subjectsRouter.use(bodyParser.json());

subjectsRouter.route("/")
    .get(async (req,res,next) =>{
        await Subject.find({})
            .populate("class")
            .populate("teacher")
            .then((subject) =>{
                res.statusCode = 200;
                res.setHeader("Content-Type","application/json")
                res.json(subject);
            },(err) =>{
                next(err);
            })
            .catch((err) =>{
                next(err);
            })

    })
    .post(async(req,res,next) =>{
        await Subject.create(req.body)
            .then((subject) =>{
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(subject);
            },(err) =>{
                next(err);
            })
            .catch((err) =>{
                next(err);
            })
    });

subjectsRouter.route("/:id")
    .get(async (req,res,next) => {
        await Subject.findById(req.params.id)
            .populate("class")
            .populate("teacher")
            .then((subject) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(subject);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    })
    .put(async (req, res, next) => {
        await Subject.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{ new :true })
            .then((subject) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(subject);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    })
    .delete(async (req, res, next) => {
        await Subject.findByIdAndRemove(req.params.id)
            .then((subject) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(subject);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    });

subjectsRouter.route("/search/:value")
    .get(async (req,res,next) => {
        console.log("Search value", req.params.value)
        let search = req.params.value;
        await Subject.find({ subject: { $regex: '.*' + search.toLowerCase() + '.*', $options: 'i' }}).sort({class: 1})
            .populate("class")
            .populate("teacher")
            .then((subject) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(subject);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    });


module.exports = subjectsRouter;

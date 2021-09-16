const express = require("express");
const bodyParser = require("body-parser");
const Class = require("../models/Class");

const classRouter = express.Router();

classRouter.use(bodyParser.json());

classRouter.route("/")
    .get(async (req,res,next) =>{
        await Class.find({}).sort({class: 1})
            .populate("classType")
            .populate("teacher")
            .then((Class) =>{
                res.statusCode = 200;
                res.setHeader("Content-Type","application/json")
                res.json(Class);
            },(err) =>{
                next(err);
            })
            .catch((err) =>{
                next(err);
            })

    })
    .post(async (req,res,next) =>{
        await Class.create(req.body)
            .then((Class) =>{
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(Class);
            },(err) =>{
                next(err);
            })
            .catch((err) =>{
                next(err);
            })
    });

classRouter.route("/:id")
    .get(async (req,res,next) => {
        await Class.findById(req.params.id)
            .populate("classType")
            .populate("teacher")
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
    .put(async (req, res, next) => {
        await Class.findByIdAndUpdate(req.params.id,{
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
        await Class.findByIdAndRemove(req.params.id)
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

classRouter.route("/search/:value")
    .get(async (req,res,next) => {
        console.log("Search value", req.params.value)
        let search = req.params.value;
        // await Class.find({class: {$regax: new RegExp('^'+req.params.value+'.*','i')}})
        await Class.find({ class: { $regex: search.toLowerCase(), $options: 'i' } })
            .populate("classType")
            .populate("teacher")
            .then((Class) => {
                console.log("get Class",Class)
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

module.exports = classRouter;
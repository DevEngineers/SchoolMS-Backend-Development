const express = require('express');
const bodyParser = require("body-parser");
const Subject = require("../models/Subject");

const subjectsRouter = express.Router();

subjectsRouter.use(bodyParser.json());

subjectsRouter.route('/')
    .get((req,res,next) =>{
        Subject.find({})
            .then((subject) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json')
                res.json(subject);
            },(err) =>{
                next(err);
            })
            .catch((err) =>{
                next(err);
            })

    })
    .post((req,res,next) =>{
        Subject.create(req.body)
            .then((subject) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(subject);
            },(err) =>{
                next(err);
            })
            .catch((err) =>{
                next(err);
            })
    });

subjectsRouter.route('/:id')
    .get((req,res,next) => {
        Subject.findById(req.params.id)
            .then((subject) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(subject);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    })
    .put((req, res, next) => {
        Subject.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{ new :true })
            .then((subject) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(subject);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    })
    .delete((req, res, next) => {
        Subject.findByIdAndRemove(req.params.id)
            .then((subject) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(subject);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    });

module.exports = subjectsRouter;
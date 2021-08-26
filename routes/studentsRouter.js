const express = require('express');
const bodyParser = require("body-parser");
const student = require("../models/Student");

const studentsRouter = express.Router();

studentsRouter.use(bodyParser.json());

studentsRouter.route('/')
    .get(async (req,res,next) =>{
        await student.find({})
            .then((student) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json')
                res.json(student);
            },(err) =>{
                next(err);
            })
            .catch((err) =>{
                next(err);
            })
    });

module.exports = studentsRouter;
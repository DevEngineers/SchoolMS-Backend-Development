const express = require('express');
const bodyParser = require("body-parser");
const ClassType = require("../models/ClassType");

/**
 * @author : M.N.M Akeel
 * Registration Number : IT19153414
 */

const classTypeRouter = express.Router();

classTypeRouter.use(bodyParser.json());

classTypeRouter.route('/')
    .get(async (req,res,next) =>{
        await ClassType.find({})
            .then((ClassType) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json')
                res.json(ClassType);
            },(err) =>{
                next(err);
            })
            .catch((err) =>{
                next(err);
            })

    })
    .post(async (req,res,next) =>{
        console.log(req.body)
        await ClassType.create(req.body)
            .then((Class) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Class);
            },(err) =>{
                next(err);
            })
            .catch((err) =>{
                next(err);
            })
    });

module.exports = classTypeRouter;
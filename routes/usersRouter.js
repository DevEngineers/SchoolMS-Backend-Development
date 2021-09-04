const express = require('express');
const bodyParser = require("body-parser");
const User= require("../models/User");

const usersRouter = express.Router();

usersRouter.use(bodyParser.json());


usersRouter.route('/')
    .get(async (req,res,next) =>{
      await User.find({})
          .then((users) =>{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json')
            res.json(users);
          },(err) =>{
            next(err);
          })
          .catch((err) =>{
            next(err);
          })

    })
    .post(async (req,res,next) =>{
      await User.create(req.body)
          .then((user) =>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user);
          },(err) =>{
            next(err);
          })
          .catch((err) =>{
            next(err);
          })
    });

usersRouter.route('/:id')
    .get(async (req,res,next) => {
        await User.findById(req.params.id)
            .then((user) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    })
    .put(async (req, res, next) => {
      await User.findByIdAndUpdate(req.params.id,{
        $set:req.body
      },{ new :true })
          .then((user) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user);
          },(err) => {
            next(err);
          })
          .catch((err) => {
            next(err);
          })
    })
    .delete(async (req, res, next) => {
      await User.findByIdAndRemove(req.params.id)
          .then((user) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user);
          },(err) => {
            next(err);
          })
          .catch((err) => {
            next(err);
          })
    });

module.exports = usersRouter;

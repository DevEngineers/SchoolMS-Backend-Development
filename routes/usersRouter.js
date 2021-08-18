const express = require('express');
const bodyParser = require("body-parser");
const User= require("../models/User");

const usersRouter = express.Router();

usersRouter.use(bodyParser.json());


usersRouter.route('/')
    .get((req,res,next) =>{
      User.find({})
          .then((users) =>{
            res.statusCode = 200;
            res.setHeader('Content-Type')
            res.json(users);
          },(err) =>{
            next(err);
          })
          .catch((err) =>{
            next(err);
          })

    })
    .get((req,res,next) => {
      User.findById(req.params.userID)
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
    .post((req,res,next) =>{
      User.create(req.body)
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
    })
    .put((req, res, next) => {
      User.findByIdAndUpdate(req.params.userID,{
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
    .delete((req, res, next) => {
      User.findByIdAndRemove(req.params.userID)
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

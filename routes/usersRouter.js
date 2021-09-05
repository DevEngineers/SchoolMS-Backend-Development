const express = require('express');
const bodyParser = require("body-parser");
const User= require("../models/User");

const usersRouter = express.Router();

usersRouter.use(bodyParser.json());


usersRouter.route('/')
    .get(async (req,res,next) =>{
      await User.find({})
          .populate('branch')
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
            .populate('branch')
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
        await User.findById(req.params.id)
            .then((user) => {

                let newUser = req.body;
                if(newUser.password !== ''){
                    user.password = newUser.password
                }else {
                    user.username = newUser.username;
                    user.email = newUser.email;
                }

                User.findByIdAndUpdate(req.params.id,{
                    $set:user
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

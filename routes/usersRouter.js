const express = require("express");
const bodyParser = require("body-parser");
const User = require("../models/User");
const authenticate = require("../authenticate");
const dotenv = require("dotenv");
dotenv.config();

const usersRouter = express.Router();

usersRouter.use(bodyParser.json());

usersRouter
    .route("/")
    .get(async (req, res, next) => {
        await User.find({})
            .populate("branch")
            .then(
                (users) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(users);
                },
                (err) => {
                    next(err);
                }
            )
            .catch((err) => {
                next(err);
            });
    })
    .post(async (req, res, next) => {
        let user = req.body;
        /*const salt = await bcrypt.genSalt(Number(process.env.SALT));
          user.password = await bcrypt.hash(user.password, salt);*/
        await User.create(user)
            .then(
                (user) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(user);
                },
                (err) => {
                    next(err);
                }
            )
            .catch((err) => {
                next(err);
            });
    });

usersRouter
    .route("/:id")
    .get(async (req, res, next) => {
        await User.findById(req.params.id)
            .populate("branch")
            .then(
                (user) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(user);
                },
                (err) => {
                    next(err);
                }
            )
            .catch((err) => {
                next(err);
            });
    })
    .put(async (req, res, next) => {
        await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true, useFindAndModify: false}
        )
            .then(
                (user) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(user);
                },
                (err) => {
                    next(err);
                }
            )
            .catch((err) => {
                next(err);
            });
    })
    .delete(async (req, res, next) => {
        await User.findByIdAndRemove(req.params.id)
            .then(
                (user) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(user);
                },
                (err) => {
                    next(err);
                }
            )
            .catch((err) => {
                next(err);
            });
    });

usersRouter.route("/login")
    .post(async (req, res, next) => {
        await User.findOne({email: req.body.email, password: req.body.password})
            .then(
                async (user) => {
                    if (user) {
                        let token = await authenticate.getToken({_id: user._id});
                        res.statusCode = 200;
                        res.setHeader("content-Type", "application/json");
                        res.json({status:200 ,token: token, userID: user._id, branch: user.branch,userType:user.userType});
                    } else {
                        res.setHeader("content-Type", "application/json");
                        res.status = 404;
                        res.json({status: "User Doesn't exist"});
                    }
                },
                (err) => {
                    next(err);
                }
            )
            .catch((err) => {
                next(err);
            });
    });

usersRouter
    .route("/userProfile/:id")
    .put(async (req, res, next) => {
        await User.findById(req.params.id)
            .then(
                async (user) => {
                    let newUser = req.body;
                    if (newUser.password !== "") {
                        /*const salt = await bcrypt.genSalt(Number(process.env.SALT));
                            user.password = await bcrypt.hash(newUser.password, salt);*/
                        user.password = newUser.password;
                    } else {
                        user.username = newUser.username;
                        user.email = newUser.email;
                    }
                    await User.findByIdAndUpdate(
                        req.params.id,
                        {
                            $set: user,
                        },
                        {new: true, useFindAndModify: false}
                    )
                        .then(
                            (user) => {
                                res.statusCode = 200;
                                res.setHeader("Content-Type", "application/json");
                                res.json(user);
                            },
                            (err) => {
                                next(err);
                            }
                        )
                        .catch((err) => {
                            next(err);
                        });
                },
                (err) => {
                    next(err);
                }
            )
            .catch((err) => {
                next(err);
            });
    });

module.exports = usersRouter;

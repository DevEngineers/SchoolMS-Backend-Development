const express = require("express");
const bodyParser = require("body-parser");
const Result = require("../models/Result");
const ExamTimetable = require("../models/ExamTimetable");

/**
 * @author : M.N.M Akeel
 * Registration Number : IT19153414
 */

const resultsRouter = express.Router();

resultsRouter.use(bodyParser.json());

resultsRouter
    .route("/")
    .get(async (req, res, next) => {
        await Result.find({})
            .populate("class")
            .populate("classType")
            .populate("studentID")
            .then(
                (results) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(results);
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
        await Result.create(req.body)
            .then(
                (result) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(result);
                },
                (err) => {
                    next(err);
                }
            )
            .catch((err) => {
                next(err);
            });
    });

resultsRouter
    .route("/:id")
    .get(async (req, res, next) => {
        await Result.findById(req.params.id)
            .populate("class")
            .populate("classType")
            /*.populate('studentID')*/
            .then(
                (result) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(result);
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
        await Result.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true}
        )
            .then(
                (result) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(result);
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
        await Result.findByIdAndRemove(req.params.id)
            .then(
                (result) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(result);
                },
                (err) => {
                    next(err);
                }
            )
            .catch((err) => {
                next(err);
            });
    });

resultsRouter.route('/search/result')
    .get(async (req, res, next) => {
        await Result.find({})
            .populate("classType")
            .populate("class")
            .populate('studentID')
            .then(
                (results) => {
                    const query = req.query;
                    let sortedResult = results.filter((item) =>{
                        if(query.type === 'studentName'){
                            return item.studentID.studentName === query.value;
                        }else if(query.type === 'class'){
                            return item.class.class === query.value;
                        }else if(query.type === 'studentID'){
                            return item.studentID.studentID === query.value;
                        }
                    })

                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(sortedResult);
                },
                (err) => {
                    next(err);
                }
            )
            .catch((err) => {
                next(err);
            });
    });

module.exports = resultsRouter;

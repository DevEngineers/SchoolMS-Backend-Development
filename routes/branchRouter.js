const express = require("express");
const bodyParser = require("body-parser");
const Branch = require("../models/Branch");

const branchRouter = express.Router();

branchRouter.use(bodyParser.json());

branchRouter
    .route("/")
    .get(async (req, res, next) => {
        await Branch.find({})
            .then(
                (branch) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(branch);
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
        await Branch.create(req.body)
            .then(
                (branch) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(branch);
                },
                (err) => {
                    next(err);
                }
            )
            .catch((err) => {
                next(err);
            });
    });

module.exports = branchRouter;

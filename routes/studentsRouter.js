const express = require('express');
const bodyParser = require("body-parser");
const Student = require("../models/Student");

const studentsRouter = express.Router();

studentsRouter.use(bodyParser.json());

studentsRouter.route('/')
    .get(async (req,res,next) =>{
        await Student.find({})
            .populate("schoolBranch")
            .populate("class")
            .populate("classType")
            .then((student) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(student);
            },(err) =>{
                next(err);
            })
            .catch((err) =>{
                next(err);
            })

    })
    .post(async(req,res,next) =>{
        await Student.find({})
            .then( async (student) =>{
                let studentIDArr=[];
                for(let i=0;i < student.length;i++  ){
                    studentIDArr[i]=student[i].studentID;
                }
                let studentID=generateId(studentIDArr);
                let studentObj=req.body;
                studentObj.studentID=studentID;
                await Student.create(studentObj)
                    .then((student) =>{
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(student);
                    },(err) =>{
                        next(err);
                    })
                    .catch((err) =>{
                        next(err);
                    })

            },(err) =>{
                next(err);
            })
            .catch((err) =>{
                next(err);
            })


    });

studentsRouter.route('/:id')
    .get(async (req,res,next) => {
        await Student.findById(req.params.id)
            .populate("schoolBranch")
            .populate("class")
            .populate("classType")
            .then((student) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(student);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    })
    .put(async (req, res, next) => {
        await Student.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{ new :true })
            .then((student) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(student);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    })
    .delete(async (req, res, next) => {
        await Student.findByIdAndRemove(req.params.id)
            .then((student) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(student);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    });

studentsRouter.route("/getStudent/search")
    .post(async (req,res,next) =>{
        await Student.find({class:req.body.class, classType:req.body.classType})
            .populate("schoolBranch")
            .populate("class")
            .populate("classType")
            .then((student) =>{
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(student);
            },(err) =>{
                next(err);
            })
            .catch((err) =>{
                next(err);
            })


    });

studentsRouter.route("/search/:value")
    .get(async (req,res,next) => {
        console.log("Search value", req.params.value)
        let search = req.params.value;
        await Student.find({ student: { $regex: '.*' + search.toLowerCase() + '.*', $options: 'i' }}).sort({student: 1})
            .populate("schoolBranch")
            .populate("class")
            .populate("classType")
            .then((Student) => {
                // console.log("get Class",Class)
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(Student);
            },(err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
    });


/*Student ID */
function  generateId(studentIdArray)
{
    let studentId;
    let arrSize = studentIdArray.length;
    arrSize++;

    studentId="ST0"+arrSize;
    if(studentIdArray.includes(studentId))
    {
        arrSize++;
        studentId="ST0"+arrSize;
    }
    return studentId;
}

module.exports = studentsRouter;

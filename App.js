const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const branchRouter = require('./routes/branchRouter');
const usersRouter = require('./routes/usersRouter');
const attendanceRouter = require('./routes/attendanceRouter');
const classRouter = require('./routes/classRouter');
const classTimetablesRouter = require('./routes/classTimetablesRouter');
const examTimetableRouter = require('./routes/examTimetablesRouter');
const feesRouter = require('./routes/feesRouter');
const resultsRouter = require('./routes/resultsRouter');
const studentsRouter = require('./routes/studentsRouter');
const subjectsRouter = require('./routes/subjectsRouter');
const teachersRouter = require('./routes/teachersRouter');
const classTypeRouter = require("./routes/classTypeRouter");
const dotenv = require('dotenv');
dotenv.config();

/**
 * Connecting to MongoDB Server
 */
const connect = mongoose.connect(process.env.MONGODB_ATLAS_URL,{
  useNewUrlParser:true,
  useUnifiedTopology:true
});

connect.then((db)=>{
  console.log('MongoDB Atlas connected with the server')
},(err)=>{
  console.log(err)
});

const app = express();

app.use(cors());
/**
 * view engine setup
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/branch', branchRouter);
app.use('/users', usersRouter);
app.use('/attendances', attendanceRouter);
app.use('/class', classRouter);
app.use('/classType', classTypeRouter);
app.use('/classTimetables', classTimetablesRouter);
app.use('/examTimetables', examTimetableRouter);
app.use('/fees', feesRouter);
app.use('/results', resultsRouter);
app.use('/students', studentsRouter);
app.use('/subjects', subjectsRouter);
app.use('/teachers', teachersRouter);


/**
 * catch 404 and forward to error handler
 */
app.use(function(req, res, next) {
  next(createError(404));
});

/**
 * error handler
 */
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  console.error(err)
});

module.exports = app;

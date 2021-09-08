const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resultSchema = new Schema(
  {
    class: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Class",
    },
    classType: {
      type: String,
      required: true,
      ref: "ClassType",
    },
    year: {
      type: String,
      required: true,
      default: "",
    },
    term: {
      type: String,
      required: true,
      default: "",
    },
    studentID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Student",
    },
    grades: {
      type: [String],
      required: true,
      default: [""],
    },
    examMarks: {
      type: [String],
      required: true,
      default: [""],
    },
    examSubjects: {
      type: [String],
      required: true,
      default: [""],
    },
  },
  {
    timestamps: true,
  }
);

let Result = mongoose.model("Result", resultSchema);

module.exports = Result;

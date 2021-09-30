//Required package
const pdf = require("pdf-creator-node");
const fs = require("fs");

// Read HTML Template
const html = fs.readFileSync("./reportModule/reportHtmlPages/AttendanceReportTemplate.html", "utf8");

const options = {
    format: "A4",
    orientation: "portrait",
    border: "10mm",
};

function convertObject(results){
    const result = {
        _id: results._id,
        classType:results.classType.name,
        year: results.year,
        term: results.term,
        grades: results.grades,
        examMarks: results.examMarks,
        examSubjects: results.examSubjects,
        class:results.class.class,
        studentID: results.studentID.studentID,
        studentName:results.studentID.studentName,
        date:new Date().toISOString().slice(0, 10),
        time:new Date().toLocaleTimeString()
    }

    return result;
}

module.exports = async function generateAttendanceReport(fileLocation,results) {
    let resultObj = convertObject(results);
    await pdf
        .create({
            html: html,
            data: {
                result: resultObj
            },
            path: fileLocation,
            type: "",
        }, options)
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            console.error(error);
        });
}

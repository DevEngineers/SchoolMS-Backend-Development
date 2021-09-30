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

function convertObject(Attendances){
    const attendance = {
        _id: Attendances._id,
        class:Attendances.class.class,
        classType:Attendances.classType.name,
        student: ['Shawn Mendes','Camila Cabello','Ratnayake','Nimal','Kamal'],
        present:['07','05','06','04','05'],
        absent:['00','02','01','03','02'],
        month: Attendances.month,
        date:new Date().toISOString().slice(0, 10),
        time:new Date().toLocaleTimeString()
    }

    return attendance;
}

module.exports = async function generateAttendanceReport(fileLocation,Attendances) {
    let attendanceObj = convertObject(Attendances);
    await pdf
        .create({
            html: html,
            data: {
                attendance: attendanceObj
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

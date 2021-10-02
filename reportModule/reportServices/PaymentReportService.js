//Required package
const pdf = require("pdf-creator-node");
const fs = require("fs");

// Read HTML Template
const html = fs.readFileSync("./reportModule/reportHtmlPages/PaymentReportTemplate.html", "utf8");

const options = {
    format: "A4",
    orientation: "portrait",
    border: "10mm",
};

function convertObject(payments){
    const payment = {
        _id: payments._id,
        classType:payments.classType.name,
        paymentType: payments.paymentType,
        class:payments.class.class,
        studentID: payments.studentId.studentID,
        studentName:payments.studentId.studentName,
        dateOfPayment:payments.dateOfPayment,
        paidAmount:payments.paidAmount,
        date:new Date().toISOString().slice(0, 10),
        time:new Date().toLocaleTimeString()
    }

    return payment;
}

module.exports = async function generatePaymentReport(fileLocation,payments) {
    let paymentObj = convertObject(payments);
    await pdf
        .create({
            html: html,
            data: {
                payment: paymentObj
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

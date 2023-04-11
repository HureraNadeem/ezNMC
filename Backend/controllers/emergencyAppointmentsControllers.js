const catchAsync = require("../utils/catchAsync");
const EmergencyAppointmentsModel = require("./../models/emergencyAppointmentsModel");

const mongoose = require('mongoose');
const GlobalError = require("../utils/globalError");
var Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const idExtractor = require("../utils/idExtractor");

exports.addTimeAndDate = async (req, res, next) => {
    req.body.time = new Date().toLocaleString();
    next();
}

exports.createEmergencyAppointment = catchAsync(async function (req, res) {
    req.body.note = req.body.note || ""
    const studentIdToFetch = idExtractor(req);

    if (studentIdToFetch === undefined || req.headers.token === undefined) {
        return next(new GlobalError("Please provide the student Id", 400))
    }

    const appointment = await EmergencyAppointmentsModel.create({
        time: req.body.time,
        note: req.body.note,
        address: req.body.address,
        studentId: mongoose.Types.ObjectId(studentIdToFetch)
    });

    res.status(201).json({
        message: "success",
        data: appointment
    })
})





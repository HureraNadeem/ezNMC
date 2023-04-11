const catchAsync = require("../utils/catchAsync");
const AppointmentModel = require("./../models/appointmentsModel");
const appointmentHistoryModel = require("./../models/appointmentHistoryModel");

const DoctorsModel = require("./../models/doctorsModel");
const mongoose = require('mongoose');
const GlobalError = require("../utils/globalError");
var Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const idExtractor = require("../utils/idExtractor");


exports.getAllAppointments = catchAsync(async (req, res, next) => {
    // const idFromHeader = mongoose.Types.ObjectId(req.headers.id);

    const doctorIdToFetch = idExtractor(req);

    const data = await AppointmentModel.aggregate([
        {
            $lookup: {
                from: "doctors",
                localField: "doctorId",
                foreignField: "_id",
                as: "doctorDetails"
            }
        },
        { $unwind: "$doctorDetails" },
        {
            $match: {
                "doctorId": mongoose.Types.ObjectId(doctorIdToFetch)
            }
        },
        {
            $lookup: {
                from: "students",
                localField: "studentId",
                foreignField: "_id",
                as: "studentDetails"
            }
        },
        { $unwind: "$studentDetails" },
        {
            $project: {
                "studentDetails.password": 0,
                "studentDetails._id": 0,
                "doctorDetails._id": 0,
                "doctorDetails.appointmentsArray": 0,
                "doctorDetails.timings": 0,
                "doctorDetails.password": 0,
                "doctorId": 0,
                "__v": 0,
                "studentId": 0,

            }
        }

    ]);
    console.log(data);
    res.status(200).json({
        message: "success",
        data: data
    })

})

exports.getAppointment = catchAsync(async function (req, res, next) {
    let idFromParam = req.params.id;
    if (idFromParam === "mark-as-done") {
        return next(new GlobalError("Route not found!", 404))
    }
    idFromParam = mongoose.Types.ObjectId(req.params.id);

    const doctorIdToFetch = idExtractor(req);

    const data = await AppointmentModel.aggregate([
        {
            $lookup: {
                from: "doctors",
                localField: "doctorId",
                foreignField: "_id",
                as: "doctorDetails"
            }
        },
        { $unwind: "$doctorDetails" },
        {
            $match: {
                "_id": mongoose.Types.ObjectId(idFromParam)
            }
        },
        {
            $match: {
                "doctorId": mongoose.Types.ObjectId(doctorIdToFetch)
            }
        },
        {
            $lookup: {
                from: "students",
                localField: "studentId",
                foreignField: "_id",
                as: "studentDetails"
            }
        },
        { $unwind: "$studentDetails" },
        {
            $project: {
                "studentDetails.password": 0,
                "studentDetails._id": 0,
                "doctorDetails._id": 0,
                "doctorDetails.appointmentsArray": 0,
                "doctorDetails.timings": 0,
                "doctorDetails.password": 0,
                "doctorId": 0,
                "studentId": 0,
            }
        }
    ]);
    res.status(200).json({
        message: "success",
        data: data
    })

})

exports.deleteAppointment = catchAsync(async function (req, res, next) {
    const idFromParam = mongoose.Types.ObjectId(req.params.id);
    // const idFromHeader = mongoose.Types.ObjectId(req.params.id);

    const doctorIdToFetch = idExtractor(req);

    const data = await AppointmentModel.findOneAndDelete({ _id: idFromParam, doctorId: doctorIdToFetch });

    console.log(data);
    if (data === null) {
        return next(new GlobalError("The appointment was not found", 404))
    }

    // const data = await AppointmentModel.findByIdAndDelete(idFromParam);
    res.status(204).json({
        message: "success",
        data: null
    })
})

exports.markAppointmentDone = catchAsync(async function (req, res, next) {
    // const idFromHeader = mongoose.Types.ObjectId(req.headers.id);

    const doctorIdToFetch = idExtractor(req);

    const idFromParam = mongoose.Types.ObjectId(req.params.id);


    if (!idFromParam || !req.params.id) {
        return next(new GlobalError("The appointment id is missing", 403))
    }

    const data = await AppointmentModel.findOneAndDelete({ _id: idFromParam, doctorId: doctorIdToFetch });

    if (data === null) {
        return next(new GlobalError("The appointment was not found", 404))
    }

    const data_ = JSON.parse(JSON.stringify(data));
    delete data_._id;
    const addedData = await appointmentHistoryModel.create(data_)

    res.status(200).json({
        message: "success"
        // data: null
    })
})

exports.createAppointment = catchAsync(async function (req, res, next) {

    const studentIdToFetch = idExtractor(req);

    if (req.body.doctorId === undefined) {
        return next(new GlobalError("Please provide the doctor Id", 400))
    }
    else if (studentIdToFetch === undefined || req.headers.token === undefined) {
        return next(new GlobalError("Please provide the student Id", 400))
    }
    const appointment = await AppointmentModel.create({
        doctorId: mongoose.Types.ObjectId(req.body.doctorId),
        timing: req.body.timing,
        description: req.body.description,
        studentId: mongoose.Types.ObjectId(studentIdToFetch)
    });
    res.status(201).json({
        message: "success",
        data: appointment
    })
})





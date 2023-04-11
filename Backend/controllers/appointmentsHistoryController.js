const AppointmentHistoryModel = require("../models/appointmentHistoryModel");
const catchAsync = require("../utils/catchAsync")
const mongoose = require('mongoose');
const idExtractor = require("../utils/idExtractor")

exports.getAllAppointmentsHistory = catchAsync(async (req, res, next) => {
    const doctorIdFromToken = idExtractor(req);
    
    const data = await AppointmentHistoryModel.aggregate([
        {
            $lookup: {
                from: "doctors",
                localField: "doctorId",
                foreignField: "_id",
                as: "doctorDetails"
            }
        },
        {
            $unwind: "$doctorDetails"
        },
        {
            $project: {
                "doctorDetails.appointmentsArray": 0
            }
        },
        {
            $match: {
                "doctorId": mongoose.Types.ObjectId(doctorIdFromToken)
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

exports.getAppointmentHistory = catchAsync(async (req, res, next) => {
    const idFromParam = mongoose.Types.ObjectId(req.params.id);
    const data = await AppointmentHistoryModel.aggregate([
        {
            $lookup: {
                from: "doctors",
                localField: "doctorId",
                foreignField: "_id",
                as: "doctorDetails"
            }
        },
        {
            $unwind: "$doctorDetails"
        },
        {
            $match: {
                "_id": mongoose.Types.ObjectId(idFromParam)
            }
        },
        {
            $project: {
                "doctorDetails.appointmentsArray": 0
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
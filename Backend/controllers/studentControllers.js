const studentModel = require("./../models/studentModel")
const mongoose = require('mongoose');
const catchAsync = require('../utils/catchAsync');
const idExtractor = require("./../utils/idExtractor");
const StudentModel = require("./../models/studentModel");


exports.idRemoverFromRequest = async (req, res, next) => {
    console.log(req.body);
    delete req.body?._id
    delete req.body?.CMS
    delete req.body?.cnic
    console.log(req.body);

    next();
}
exports.editStudent = catchAsync(async (req, res) => {
    const token = idExtractor(req);

    const data = await studentModel.findByIdAndUpdate(token, req.body, {
        reqValidator: true,
        new: true
    });

    if (!data) {
        return next(new GlobalError("The Student data could not be found", 404));
    }

    res.status(204).json({
        status: "success",
        message: "updated successfully!"
    })
})
exports.getStudent = catchAsync(async (req, res) => {
    const token = idExtractor(req);

    const data = await StudentModel.findById(token).select("+password");

    if (!data) {
        return next(new GlobalError("The Student data could not be found", 404));
    }

    res.status(200).json({
        status: "success",
        data: data
    })
})
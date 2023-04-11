const catchAsync = require('../utils/catchAsync');
const StudentModel = require('./../models/studentModel');
const DoctorModel = require('./../models/doctorsModel');
const jwt = require('jsonwebtoken');
const GlobalError = require('../utils/globalError');
const { promisify } = require("util")


exports.login = catchAsync(async (req, res) => {
    let user = {};
    const userType = req.body.userType;
    let token = "";

    if (userType === "student") {
        user = await StudentModel.findOne({
            CMS: req.body.CMS,
            password: req.body.password
        })
        // console.log(user);
        token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
        token = `${"a"}${token}`
    }

    else if (userType === 'doctor') {
        user = await DoctorModel.findOne({
            employeeID: req.body.employeeID,
            password: req.body.password
        })
        // console.log(user);
        token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
        token = `${"b"}${token}`
    }
    // console.log(user);
    let newData = {...user};
    // console.log(newData.data["_doc"]["name"])
    
    // newData = {name: newData["name"]}
    // console.log(newData)
    // console.log(newData["name"])



    res.status(200).json({
        message: "success",
        AccessToken: token,
        data: {name: newData._doc.name}
    })
})

exports.signup = catchAsync(async (req, res) => {
    const newStudent = await StudentModel.create({
        name: req.body.name,
        CMS: req.body.CMS,
        email: req.body.email,
        cnic: req.body.cnic,
        phone: req.body.phone,
        password: req.body.password,
        // confirmPassword: req.body.confirmPassword,
    });

    // let token = jwt.sign({ id: newStudent._id }, process.env.JWT_SECRET, {
    //     expiresIn: process.env.JWT_EXPIRES_IN
    // });

    // token = `${"a"}${token}`
    // console.log(newStudent);

    res.status(201).json({
        message: "success",
        // AccessToken: token,
        data: newStudent
    });

})

exports.protectFromLoggedOut = catchAsync(async (req, res, next) => {
    const accessToken = req.headers.token;
    if (!accessToken) {
        return next(new GlobalError("You're logged out, please log in again!", 401))
    }
    accessToken_ = accessToken.slice(1);

    try {
        await jwt.verify(accessToken_, process.env.JWT_SECRET);
        // console.log(decoded);
    }
    catch (err) {
        if (err.name === 'TokenExpiredError') {
            return next(new GlobalError("Log in session expired, please log in again!", 401))
        }
        else if (err.name === 'JsonWebTokenError') {
            return next(new GlobalError("InValid Token", 401))
        }
    }
    next();
})

exports.protectFromStudent = catchAsync(async (req, res, next) => {
    const accessToken = req.headers.token;
    const checker = accessToken.at(0);
    if (checker === "a") {
        return next(new GlobalError("You dont have the access to this route!", 403))
    }
    else if (checker != "a" && checker != "b") {
        return next(new GlobalError("You dont have the access to this route!", 403))
    }
    next();
})

exports.protectFromDoctor = catchAsync(async (req, res, next) => {
    const accessToken = req.headers.token;
    const checker = accessToken.at(0);
    if (checker === "b") {
        return next(new GlobalError("You dont have the access to this route!", 403))
    }
    else if (checker != "a" && checker != "b") {
        return next(new GlobalError("You dont have the access to this route!", 403))
    }
    next();
})
const express = require("express");
const doctorInfoControllers = require("./../controllers/doctorInfoControllers");
const authControllers = require("./../controllers/authControllers");


const router = express.Router();


router.route("/").get(authControllers.protectFromLoggedOut, authControllers.protectFromStudent, doctorInfoControllers.getDoctorInfo)


module.exports = router;

const express = require("express");
const emergencyAppointmentsControllers = require("./../controllers/emergencyAppointmentsControllers");
const authControllers = require("./../controllers/authControllers");

const router = express.Router();

router.route("/").post(authControllers.protectFromLoggedOut, authControllers.protectFromDoctor, emergencyAppointmentsControllers.addTimeAndDate, emergencyAppointmentsControllers.createEmergencyAppointment)


module.exports = router;

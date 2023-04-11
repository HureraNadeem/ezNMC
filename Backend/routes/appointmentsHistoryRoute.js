const express = require("express");
const appointmentsHistoryController = require("./../controllers/appointmentsHistoryController");
const authControllers = require("./../controllers/authControllers");


const router = express.Router();


router.route("/").get(authControllers.protectFromLoggedOut, authControllers.protectFromStudent, appointmentsHistoryController.getAllAppointmentsHistory)
// router.route("/:id").get(authControllers.protectFromLoggedOut, authControllers.protectFromStudent, appointmentsHistoryController.getAppointmentHistory)

module.exports = router;

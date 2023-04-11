const express = require("express");
const appointmentControllers = require("./../controllers/appointmentsController");
const authControllers = require("./../controllers/authControllers");


const router = express.Router();

router.route("/").get(authControllers.protectFromLoggedOut, authControllers.protectFromStudent, appointmentControllers.getAllAppointments).post(authControllers.protectFromLoggedOut, authControllers.protectFromDoctor, appointmentControllers.createAppointment)

router.route("/:id").get(authControllers.protectFromLoggedOut, authControllers.protectFromStudent, appointmentControllers.getAppointment)

router.route("/:id").delete(authControllers.protectFromLoggedOut, authControllers.protectFromStudent, appointmentControllers.deleteAppointment)

router.route("/mark-as-done/:id").get(authControllers.protectFromLoggedOut, authControllers.protectFromStudent, appointmentControllers.markAppointmentDone)

module.exports = router;

const express = require("express");
const doctorControllers = require("./../controllers/doctorsController");
const authControllers = require("./../controllers/authControllers");



const router = express.Router();


router.route("/").get(doctorControllers.getAllDoctors)
router.route("/:id").get(authControllers.protectFromLoggedOut, authControllers.protectFromDoctor, doctorControllers.getDoctor)

router.route("/").patch(authControllers.protectFromLoggedOut, authControllers.protectFromStudent, doctorControllers.idRemoverFromRequest, doctorControllers.editDoctor)

module.exports = router;

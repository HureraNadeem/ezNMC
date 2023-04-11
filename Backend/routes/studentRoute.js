const express = require("express");
const studentControllers = require("./../controllers/studentControllers");
const authControllers = require("./../controllers/authControllers");


const router = express.Router();


router.route("/").patch(authControllers.protectFromLoggedOut, authControllers.protectFromDoctor, studentControllers.idRemoverFromRequest, studentControllers.editStudent)
router.route("/").get(authControllers.protectFromLoggedOut, authControllers.protectFromDoctor, studentControllers.getStudent)

module.exports = router;

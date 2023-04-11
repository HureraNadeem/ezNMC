const express = require("express");
const authControllers = require("./../controllers/authControllers");

const router = express.Router();



router.route("/login").post(authControllers.login)
router.route("/signup").post(authControllers.signup)

module.exports = router;

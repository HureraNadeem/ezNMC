const express = require("express");
const orderControllers = require("./../controllers/orderControllers");
const authControllers = require("./../controllers/authControllers");


const router = express.Router();


router.route("/").post(authControllers.protectFromLoggedOut, authControllers.protectFromDoctor, orderControllers.addTimeAndDate, orderControllers.createOrder)


module.exports = router;

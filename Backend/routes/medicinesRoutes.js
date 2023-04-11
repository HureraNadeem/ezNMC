const express = require("express");
const medicineControllers = require("./../controllers/medicineControllers");
const authControllers = require("./../controllers/authControllers");



const router = express.Router();


router.route("/").get(medicineControllers.getAllMedicines).post(medicineControllers.createMedicine)
router.route("/:id").get(authControllers.protectFromLoggedOut, authControllers.protectFromDoctor, medicineControllers.getMedicine).patch(medicineControllers.editMedicine).delete(medicineControllers.deleteMedicine)

module.exports = router;

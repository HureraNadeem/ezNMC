const mongoose = require('mongoose');
const doctorsModel = require('./doctorsModel');
var Schema = mongoose.Schema;

const AppointmentSchema = new mongoose.Schema(
    {
        timing: {
            type: String,
            required: [true, "Please provide time for appointment"]
        },
        doctorId: {
            type: Schema.Types.ObjectId, ref: "doctorsModel",
            required: [true, "Please enter doctor id for appointment"],
            default: 0
        },
        description: {
            type: String,
            required: [true, "Please provide description for appointment"]
        },
        studentId: {
            type: Schema.Types.ObjectId, ref: "studentModel",
            required: [true, "Please enter student id for appointment"],
            default: 0
        }
    }
);

const AppointmentModel = mongoose.model('appointment', AppointmentSchema);

module.exports = AppointmentModel;

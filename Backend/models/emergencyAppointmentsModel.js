const mongoose = require('mongoose');
const doctorsModel = require('./doctorsModel');
var Schema = mongoose.Schema;

const EmergencyAppointmentSchema = new mongoose.Schema(
    {
        note: {
            type: String,
            // required: [true, "Please enter note for appointment"]
        },
        address: {
            type: String,
            required: [true, "Please enter address for appointment"]
        },
        studentId: {
            type: Schema.Types.ObjectId, ref: "studentModel",
            required: [true, "Please enter student id for appointment"]
        }
    }
);

const EmergencyAppointmentModel = mongoose.model('emergencyAppointments', EmergencyAppointmentSchema, 'emergencyAppointments');

module.exports = EmergencyAppointmentModel;

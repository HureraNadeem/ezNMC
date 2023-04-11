const mongoose = require('mongoose');
const doctorsModel = require('./doctorsModel');
var Schema = mongoose.Schema;

const AppointmentHistorySchema = new mongoose.Schema(
    {
        timing: {
            type: String,
            required: [true, "Please enter time of appointment"]
        },
        doctorId: {
            type: Schema.Types.ObjectId, ref: "doctorsModel",
        },
        description: {
            type: String,
            required: [true, "Please description for appointment"]
        },
        studentId: {
            type: Schema.Types.ObjectId, ref: "studentModel",
            required: [true, "Please enter student id for appointment"]
        }
    }
);

const AppointmentHistoryModel = mongoose.model('appointmentsHistory', AppointmentHistorySchema, 'appointmentsHistory');

module.exports = AppointmentHistoryModel;

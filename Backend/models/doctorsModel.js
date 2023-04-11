const mongoose = require('mongoose');
const appointmentModel = require('./appointmentsModel')
var Schema = mongoose.Schema;

const DoctorsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter name of the medicine"]
        },
        qualification: {
            type: String,
            required: [true, "Please enter name of the medicine"]
        },
        timings: {
            type: [String]
        },
        fieldOfSpeciality: {
            type: String,
        },
        appointmentsArray: {
            type: [Schema.Types.ObjectId], ref: "appointmentModel"
        },
        employeeID: {
            type: String,
            
        },
        password: {
            type: String,
            select: false,
            minLength: 8
        }

    }
);

DoctorsSchema.pre("findOneAndUpdate", function (next) {
    this.options.runValidators = true;
    next();
  });

const DoctorsModel = mongoose.model('doctor', DoctorsSchema);

module.exports = DoctorsModel;

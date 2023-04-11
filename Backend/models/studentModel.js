const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var validator = require("validator");

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name of the medicine"],
    trim: true,
  },
  CMS: {
    type: String,
    required: [true, "Please enter your CMS"],
    unique: [true, "This CMS is already registered."],
    minlength: 6,
    maxlength: 6,
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: [true, "This email address is already registered."],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  phone: {
    type: String,
    required: [true, "Please enter your phone"],
    unique: [true, "This phone number is already registered."],
    maxlength: 13,
    minlength: 13,
    // validate: {
    //     // This only works on CREATE and SAVE!!!
    //     validator: function (val) {
    //         return val.startsWith("+92");
    //     },
    //     message: 'Phone Number should be starting with +92'
    // }
  },
  cnic: {
    type: String,
    required: [true, "Please enter your CNIC"],
    unique: [true, "This CNIC is already registered."],
    maxlength: 13,
    minlength: 13,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    // required: [true, 'Please confirm your password'],
    minlength: 8,
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
});

StudentSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

const StudentModel = mongoose.model("Student", StudentSchema);

module.exports = StudentModel;

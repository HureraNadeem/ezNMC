const mongoose = require('mongoose');
// const slugify = require('slugify');
// const validator = require("validator");

const medicineSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter name of the medicine"]
        },
        company: {
            type: String,
            required: [true, "Please enter name of company of the medicine"]
        },
        samplePicture: {
            type: String,
            required: [true, "Please enter sample picture of the medicine"]
        },
        price: {
            type: Number,
            required: [true, "Please enter price of the medicine"]
        },
        availableQuantity: {
            type: Number,
            required: [true, "Please enter available quantity of the medicine"]
        },
        description: {
            type: String,
            required: [true, "Please enter description of the medicine"]
        },
        doseEachMedicine: {
            type: String,
            required: [true, "Please enter dose of the medicine"]
        }
    }
);

const Medicine = mongoose.model('medicine', medicineSchema);

module.exports = Medicine;

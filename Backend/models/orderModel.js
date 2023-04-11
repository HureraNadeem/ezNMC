const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validator = require('validator');

const OrderSchema = new mongoose.Schema(
    {
        studentId: {
            type: Schema.Types.ObjectId, ref: "studentModel",
            required: [true, "Please enter student id for ordering"],
        },
        TimeAndDate: {
            type: String,
            required: [true, "Please enter Time for order"],
        },
        orderStatus: {
            type: String,
            required: [true, "Please enter status for order"],
        },
        deliveryAddress: {
            type: String,
            required: [true, "Please enter delivery address for order"]
        },
        items: {
            type: [
                {
                    itemId: {
                        type: Schema.Types.ObjectId, ref: "medicineModel",
                        required: [true, `id of some item is missing`],
                    },
                    quantity: {
                        type: Number,
                        required: [true, `Quantity of some item is missing`],
                    }
                }
            ],
        }
    }
);

// OrderSchema.pre('save', function(next) {
//     this.TimeAndDate = Date.now();
//     next();
//   });

const OrderModel = mongoose.model('order', OrderSchema);

module.exports = OrderModel;

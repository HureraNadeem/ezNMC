const OrderModel = require("./../models/orderModel");
const MedicinesModel = require("./../models/medicinesModel");
const mongoose = require('mongoose');
const catchAsync = require("../utils/catchAsync");
const idExtractor = require("../utils/idExtractor");
const GlobalError = require("../utils/globalError");

exports.addTimeAndDate = async (req, res, next) => {
    req.body.TimeAndDate = new Date().toLocaleString();
    next();
}

exports.createOrder = catchAsync(async (req, res, next) => {

    const token = idExtractor(req)

    const OrderStatus = "pending"
    if (!req.body.items || req.body.items.length === 0) {
        return next(new GlobalError("You must add items in the order.", 400))
    }

    const data = await OrderModel.create(
        {
            studentId: token,
            TimeAndDate: req.body.TimeAndDate,
            orderStatus: OrderStatus,
            deliveryAddress: req.body.deliveryAddress,
            items: req.body.items
        }
    );

    for (let i = 0; i < data?.items.length; i++) {
        const element = data?.items[i]
        const id = mongoose.Types.ObjectId(element["itemId"]);
        const dataBaseItems = await MedicinesModel.findById(id)
        const lmao = await MedicinesModel.findByIdAndUpdate(id, { availableQuantity: dataBaseItems["availableQuantity"] - element["quantity"] })
    }

    res.status(200).json({
        message: "success",
        data: data
    })
})




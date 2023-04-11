const DoctorsModel = require("./../models/doctorsModel");
const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsync");
const idExtractor = require("./../utils/idExtractor");

exports.getDoctorInfo = catchAsync(async (req, res) => {
  const token = idExtractor(req);
//   const data = await DoctorsModel.aggregate([
//     {
//       $unwind: "$appointmentsArray",
//     },
//     {
//       $lookup: {
//         from: "appointments",
//         localField: "appointmentsArray",
//         foreignField: "_id",
//         as: "apointmentDetails",
//       },
//     },
//     {
//       $unwind: {
//         path: "$apointmentDetails",
//         preserveNullAndEmptyArrays: true,
//       },
//     },
//     {
//       $group: {
//         _id: {
//           doctorId: "$doctorId",
//           name: "$name",
//         },
//         data: {
//           $first: "$$ROOT",
//         },
//         appointmentsArray: {
//           $push: "$appointmentsArray",
//         },
//         apointmentDetails: {
//           $push: "$apointmentDetails",
//         },
//       },
//     },
//     {
//       $addFields: {
//         "data.apointmentDetails": "$apointmentDetails",
//       },
//     },
//     {
//       $replaceRoot: {
//         newRoot: "$data",
//       },
//     },
//     {
//       $project: {
//         appointmentsArray: 0,
//         employeeID: 0,
//         // password: 0
//       },
//     },
//     {
//       $match: {
//         _id: mongoose.Types.ObjectId(token),
//       },
//     },
//   ]);
  const data_ = await DoctorsModel.findById(token).select("+password");

  console.log(data_)

  res.status(200).json({
    message: "success",
    data: data_,
  });
});

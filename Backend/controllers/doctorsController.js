const DoctorsModel = require("./../models/doctorsModel")
const mongoose = require('mongoose');
const catchAsync = require('../utils/catchAsync');
const idExtractor = require("./../utils/idExtractor")


exports.idRemoverFromRequest = async (req, res, next) => {
    delete req.body?._id
    delete req.body?.employeeID
    delete req.body?.qualification
    delete req.body?.fieldOfSpeciality
    next();
}

exports.getAllDoctors = async (req, res) => {
    // const data = await DoctorsModel.aggregate([
    //     {
    //         $unwind: "$appointmentsArray"
    //     },
    //     {
    //         $lookup: {
    //             from: "appointments",
    //             "let": {
    //                 "appointments": "appointments._id"
    //             },
    //             // "pipeline": [
    //             //     {
    //             //         "$match": {
    //             //             "$expr": {
    //             //                 "$eq": [
    //             //                     "$appointments._id",
    //             //                     "$appointmentsArray"
    //             //                 ]
    //             //             }
    //             //         }
    //             //     }
    //             // ],
    //             "appointments": { $in: "$appointmentsArray" },
    //             as: "appoitmentsDetails"
    //         }
    //     },
    //     {
    //         $project: {
    //             "appointmentsArray": 0
    //         }
    //     }
    // ]);
    // const data = await DoctorsModel.aggregate([
    //     {
    //         $unwind: "$appointmentsArray"
    //     },
    //     {
    //         $lookup: {
    //             from: "appointments",
    //             localField: "appointmentsArray",
    //             foreignField: "_id",
    //             as: "apointmentDetails"
    //         }
    //     },
    //     {
    //         $unwind: {
    //             path: "$apointmentDetails",
    //             preserveNullAndEmptyArrays: true
    //         }
    //     },
    //     {
    //         $group: {
    //             _id: {
    //                 "doctorId": "$doctorId",
    //                 "name": "$name",

    //             },
    //             data: {
    //                 $first: "$$ROOT"
    //             },
    //             appointmentsArray: {
    //                 $push: "$appointmentsArray"
    //             },
    //             apointmentDetails: {
    //                 $push: "$apointmentDetails"
    //             }
    //         }
    //     },
    //     {
    //         $addFields: {
    //             "data.apointmentDetails": "$apointmentDetails"
    //         }
    //     },
    //     {
    //         $replaceRoot: {
    //             newRoot: "$data"
    //         }
    //     },
    //     {
    //         $project: {
    //             appointmentsArray: 0,
    //             employeeID: 0,
    //             password: 0
    //         }
    //     }

    // ]);
    const data = await DoctorsModel.find();

    console.log(data);
    res.status(200).json({
        message: "success",
        data: data
    })

}

exports.getDoctor = async (req, res) => {
    const idFromParam = mongoose.Types.ObjectId(req.params.id);
    
    const data = await DoctorsModel.aggregate([
        {
            $unwind: "$appointmentsArray"
        },
        {
            $lookup: {
                from: "appointments",
                localField: "appointmentsArray",
                foreignField: "_id",
                as: "apointmentDetails"
            }
        },
        {
            $unwind: {
                path: "$apointmentDetails",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: {
                    "doctorId": "$doctorId",
                    "name": "$name",

                },
                data: {
                    $first: "$$ROOT"
                },
                appointmentsArray: {
                    $push: "$appointmentsArray"
                },
                apointmentDetails: {
                    $push: "$apointmentDetails"
                }
            }
        },
        {
            $addFields: {
                "data.apointmentDetails": "$apointmentDetails"
            }
        },
        {
            $replaceRoot: {
                newRoot: "$data"
            }
        },
        {
            $project: {
                appointmentsArray: 0,
                employeeID: 0,
                // password: 0
            }
        },
        {
            $match: {
                "_id": mongoose.Types.ObjectId(idFromParam)
            }
        },
    ]);

    res.status(200).json({
        message: "success",
        data: data[0]
    })

}

exports.editDoctor = catchAsync(async (req, res) => {
    const token = idExtractor(req);

    const data = await DoctorsModel.findByIdAndUpdate(token, req.body, {
        reqValidator: true,
        new: true
    });

    if (!data) {
        return next(new GlobalError("The Doctor data could not be found", 404));
    }

    res.status(204).json({
        status: "success",
        message: "updated successfully!"
    })
})
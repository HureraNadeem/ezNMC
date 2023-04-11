const Medicine = require("./../models/medicinesModel");
const catchAsync = require("./../utils/catchAsync");
const GlobalError = require("./../utils/globalError")

exports.getAllMedicines = catchAsync(async (req, res) => {
    let medicines = await Medicine.find();
    medicines = medicines.filter(val => val.availableQuantity > 0);
    console.log(medicines);

    res.status(200).json({
        status: "success",
        length: medicines.length,
        data: medicines
    })
})

exports.getMedicine = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    const data = await Medicine.findById(id);

    if (!data) {
        return next(new GlobalError("The medicine could not ne found", 404));
    }

    res.status(200).json({
        status: "success",
        data: data
    })
})

exports.createMedicine = catchAsync(async (req, res) => {
    // console.log(req.body);
    const medicines = await Medicine.create(req.body);
    console.log(medicines);

    res.status(201).json({
        status: "success",
        data: medicines
    })
})

exports.editMedicine = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    const data = await Medicine.findByIdAndUpdate(id, req.body, {
        reqValidator: true,
        new: true
    });

    if (!data) {
        return next(new GlobalError("The medicine could not ne found", 404));
    }

    res.status(200).json({
        status: "success",
        data: data
    })
})

exports.deleteMedicine = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    const data = await Medicine.findByIdAndDelete(id);

    if (!data) {
        return next(new GlobalError("The medicine could not ne found", 404));
    }

    res.status(204).json({
        status: "success",
        data: null
    })
})
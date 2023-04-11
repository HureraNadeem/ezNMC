const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const idExtractor = (req) => {
    const token = req.headers.token;
    let token_ = token.slice(1);
    decoded = jwt.verify(token_, process.env.JWT_SECRET);
    const idToBeFetched = mongoose.Types.ObjectId(decoded["id"])
    return idToBeFetched
}

module.exports = idExtractor
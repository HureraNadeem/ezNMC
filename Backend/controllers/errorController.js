const GlobalError = require("./../utils/globalError");

module.exports = async (err, req, res, next) => {
  // console.log(err);
  if (err?.name === "ValidationError") {
    err.statusCode = 400;
    err.message = err._message || "ValidationError";
    err.status = err.status || "fail";
    let errors = {};

    Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message;
    });

    err.message = errors;

    // return res.status(400).send(errors);
  }
  if (err.code === 11000) {
    err.statusCode = 400;
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value!`;
    err.message = message;
    err.status = err.status || "fail";
  }
  if (err.name === "TokenExpiredError") {
    err.statusCode = 401;
    err.message = "Session Expired! Please login again! ";
    err.status = err.status || "fail";
  } else {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "error";
    err.status = err.status || "fail";
  }

  // const error_ = new GlobalError(err.message, err.statusCode);

  res.status(err.statusCode).json({
    message: err.message,
    status: err.status,
    statusCode: undefined,
    error: err,
  });

  next();
};

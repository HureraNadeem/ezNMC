class GlobalError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "interal server error";
        // this.operationalError = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
module.exports = GlobalError
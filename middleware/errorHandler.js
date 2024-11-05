const { constants } = require("../constants");
const { stack } = require("../routes/authRoutes");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.satusCode ? res.satusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed",
                message: err.message,
                stackTrace: stack
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: stack
            });
            case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: stack
            });
            case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: stack
            });
            case constants.SERVER_ERROR:
            res.json({
                title: "Server Error",
                message: err.message,
                stackTrace: stack
            });
        default:
            console.log("No Error, All Good");
            break;
    }
};

module.exports = errorHandler;
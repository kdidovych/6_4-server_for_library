const ResponseError = require('../errors/ResponseError');
const logger = require('../loggers/logger');

const CODES = {
    400: "Bad Request",
    500: "Internal Server Error"
};

/** @TODO use pino as example for logging */
const logError = async (error) => {
    console.log("Message: ", error.message);
    console.log("Cause: ", error.cause);
}

module.exports = (error, req, res, next) => {
    if (error.shouldBeLogged) {
        logger.log(error);
        void logError(error);
    }

    if (error instanceof ResponseError) {
        const code = error.code || 500;
        if (!error.message) {
            error.message = (code === 500 || code === 400) ? CODES[code] : "Something went wrong";
        }
        res.status(error.code).send(error.message);
        return;
    }

    if (error instanceof Error) {
        res.status(500).send(CODES[500]);
        return;
    }

    next(error);
};

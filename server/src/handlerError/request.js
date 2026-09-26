const ResponseError = require('../errors/ResponseError');
const logger = require('../loggers/logger');

const CODES = {
    400: "Bad Request",
    500: "Internal Server Error"
};

module.exports = (error, req, res, next) => {
    if (error.shouldBeLogged) {
        logger.log(error);
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

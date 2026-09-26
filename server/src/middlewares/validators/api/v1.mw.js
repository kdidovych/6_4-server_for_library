const ResponseError = require('../../../errors/ResponseError');

const generateIdError = () => {
    return new ResponseError('Required field Id must be an integer positive value', {code: 400});
}
const generateValidationError = (error) => {
    return new ResponseError(error.inner.join('.'), {code: 400});
}

const getRequestData = (req, isIdNeeded) => {
    const data = {...req.body};
    ['createdAt', 'updatedAt'].forEach((timeField) => {
        if (!data[timeField]) {
            data[timeField] = new Date().toISOString();
        }
    });
    if (isIdNeeded) {
        data.id = parseInt(data.id);
        if (!data.id || data.id < 1) {
            throw generateIdError();
        }
    }
    if (!isIdNeeded && Object.hasOwn(data, "id")) delete data.id;
    return data;
}

module.exports.validateGetById = async (req, res, next) => {
    try {
        if (!req.params.id || req.params.id < 1) {
            next(generateIdError());
        }
        req.params.id = parseInt(req.params.id);
    } catch (error) {
        next(error);
    }
    next();
};

module.exports.validateCreateOne = async (req, res, next, schema) => {
    try {
        const data = getRequestData(req, false);
        req.body.data = await schema.validate(data, {abortEarly: false});
    } catch (error) {
        if (error.name === 'ValidationError') {
            next(generateValidationError(error));
        }
        next(error);
    }
    next();
};

module.exports.validateUpdateOne = async (req, res, next, schema) => {
    try {
        const data = getRequestData(req, true);
        req.body.data = await schema.validate(data, { abortEarly: false });
    } catch (error) {
        if (error.name === 'ValidationError') {
            next(generateValidationError(error));
        }
        next(error);
    }
    next();
};

module.exports.validateDeleteById = async (req, res, next) => {
    try {
        if (!req.params.id || req.params.id < 1) {
            next(generateIdError());
        }
        req.params.id = parseInt(req.params.id);
    } catch (error) {
        next(error);
    }
    next();
};

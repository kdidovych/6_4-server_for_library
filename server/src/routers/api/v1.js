const express = require('express');
const router = express.Router({ caseSensitive: true, strict: true });
const apiValidators = require('../../middlewares/validators/api/v1.mw');
const schemes = require('../../validationSchemes/models');

const nameEntities = {
    'author': require('../../controllers/api/v1/author'),
    'book': require('../../controllers/api/v1/book'),
    'customer': require('../../controllers/api/v1/customer')
}
Object.keys(nameEntities).forEach(name => {
    router
        .get(`/${name}s`, nameEntities[name].getAll)
        .get(`/${name}/:id`, apiValidators.validateGetById, nameEntities[name].getById)
        .post(`/${name}`,
            (...params) => apiValidators.validateCreateOne(...params, schemes[name]),
            nameEntities[name].createOne)
        .put(`/${name}`,
            (...params) => apiValidators.validateUpdateOne(...params, schemes[name]),
            nameEntities[name].updateOne)
        .delete(`/${name}/:id`, apiValidators.validateDeleteById, nameEntities[name].deleteById)
});

module.exports = router;

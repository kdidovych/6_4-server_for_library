const yup = require('yup');

module.exports.author = yup.object().shape({
    id: yup.number()
        .integer('Id must be a whole number')
        .notRequired(),
    full_name: yup.string()
        .min(1)
        .max(255)
        .required('Full name is a required field'),
    email: yup.string()
        .email('Must be a real email address')
        .min(4)
        .max(255)
        .required('Email is a required field'),
    nationality_id: yup.number()
        .integer('Nationality Id must be a whole number')
        .required('Nationality is a required field'),
    createdAt: yup.string()
        .datetime({message: 'Created At must be a valid ISO string timestamp'})
        .notRequired(),
    updatedAt: yup.string()
        .datetime({message: 'Updated At must be a valid ISO string timestamp'})
        .notRequired()
});

module.exports.book = yup.object().shape({
    id: yup.number()
        .integer('Id must be a whole number')
        .notRequired(),
    title: yup.string()
        .min(1)
        .max(255)
        .required('Title is a required field'),
    genre_id: yup.number()
        .integer('Genre Id must be a whole number')
        .required('Genre is a required field'),
    shelf_id: yup.number()
        .integer('Genre Id must be a whole number')
        .required('Genre is a required field'),
    description: yup.string()
        .notRequired(),
    image: yup.string()
        .min(1)
        .max(255)
        .notRequired(),
    createdAt: yup.string()
        .datetime({message: 'Created At must be a valid ISO string timestamp'})
        .notRequired(),
    updatedAt: yup.string()
        .datetime({message: 'Updated At must be a valid ISO string timestamp'})
        .notRequired()
});

module.exports.customer = yup.object().shape({
    id: yup.number()
        .integer('Id must be a whole number')
        .notRequired(),
    full_name: yup.string()
        .min(1)
        .max(255)
        .required('Full name is a required field'),
    email: yup.string()
        .email('Must be a real email address')
        .min(4)
        .max(255)
        .required('Email is a required field'),
    phone: yup.string()
        .min(9)
        .max(255)
        .notRequired(),
    password: yup.string()
        .min(6)
        .max(255)
        .required('Password is a required field'),
    createdAt: yup.string()
        .datetime({message: 'Created At must be a valid ISO string timestamp'})
        .notRequired(),
    updatedAt: yup.string()
        .datetime({message: 'Updated At must be a valid ISO string timestamp'})
        .notRequired()
});

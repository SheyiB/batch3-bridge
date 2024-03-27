const joi = require('joi');

const createUserValidator = (userData) => {
    const schema = joi.object({

        username: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),

    })
    return schema.validate(userData)
}

const updateUserValidator = (userData) => {
    const schema = joi.object({

        id: joi.number().required(),
        username: joi.string(),
        email: joi.string().email(),
        password: joi.string(),

    }).or('name', 'email', 'password')

    return schema.validate(userData)
}

module.exports = {
    createUserValidator,
    updateUserValidator
}
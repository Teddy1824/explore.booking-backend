const Joi = require('joi')

const registerValidator = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
        email: Joi.string().min(6).required().email(),
        phone_number: Joi.string().length(10).pattern(/^[0-9]^/),
        password: Joi.string().min(6).max(18).required()
    })
    return schema.validate(data)
};

const loginValidator = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data)
}

module.exports.registerValidator = registerValidator
module.exports.loginValidator = loginValidator
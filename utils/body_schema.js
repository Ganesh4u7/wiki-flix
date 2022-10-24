const Joi = require('@hapi/joi');

const body_schemas = {
    signup: Joi.object({
        email: Joi.string().email().required(),
        username:Joi.string().required(),
        fullname:Joi.string().required(),
        password: Joi.string().required()
      }),
    login: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        email_check:Joi.boolean()
    }),
    verify_account: Joi.object({
        email:Joi.string().email().required(),
        otp:Joi.number().required()
    }),
    send_otp: Joi.object({
        email: Joi.string().email().required()
    }),
    user_exist_check : Joi.object({
        query:Joi.object().required()
    }),
    change_password: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),
    
};

module.exports = { body_schemas };
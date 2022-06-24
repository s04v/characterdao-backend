const Joi = require('joi');

const UserSchema = Joi.object().keys({
    Email: Joi.string().email().required().messages({
        'string.email': 'Email format must be a valid'
    }),
    Password: Joi.string().min(6).max(30).regex(/^[a-zA-Z0-9!@#$%&*\.]{3,30}$/).required().messages({
        'string.min': 'Password length must be at least 6 characters long',
        'string.max': 'Password length must be less than or equal to 20 characters long',
    })
});

const CharacterSchema = Joi.object().keys({
    Name: Joi.string().min(2).max(50).messages({
        'string.min': 'Name length must be at least 6 characters long',
        'string.max': 'Name length must be less than or equal to 20 characters long',
    }).required(),
    NFTLink: Joi.string().required(),
    SocialLink: Joi.string().required(),
    Description: Joi.string().required(),
    MainPhoto: Joi.string().required(),
    Photo1: Joi.string().allow(null),
    Photo2: Joi.string().allow(null),
    Photo3: Joi.string().allow(null),
    IsPublic: Joi.allow('true', 'false').required()
});

module.exports = {UserSchema, CharacterSchema};
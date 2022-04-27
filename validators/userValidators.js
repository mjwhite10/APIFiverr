const Joi = require('@hapi/joi');
const { generateError } = require('../helpers');

const newUserSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
    .error(
      generateError('El campo email debe existir y ser un email válido', 400)
    ),
  password: Joi.string()
    .min(4)
    .required()
    .error(
      generateError(
        'El campo password debe existir y ser mayor de 4 caracteres',
        400
      )
    ),
  name: Joi.string()
    .required()
    .error(generateError('El campo nombre debe existir', 400)),
});

const loginUserSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
    .error(
      generateError('El campo email debe existir y ser un email válido', 400)
    ),
  password: Joi.string()
    .min(4)
    .required()
    .error(
      generateError(
        'El campo password debe existir y ser mayor de 4 caracteres',
        400
      )
    ),
});

module.exports = { newUserSchema, loginUserSchema };

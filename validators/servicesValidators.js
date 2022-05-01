const Joi = require('@hapi/joi');
const { generateError } = require('../helpers');

const idServiceSchema = Joi.object().keys({
  idService: Joi.number()
    .positive()
    .required()
    .greater(0)
    .error(
      generateError(
        'El campo idUser debe exisitir y debe ser un entero mayor que 0 ',
        400
      )
    ),
});

const newServiceSchema = Joi.object().keys({
  title: Joi.string()
    .max(100)
    .required()
    .error(
      generateError(
        'El campo title debería existir y no exceder los 100 caracteres',
        400
      )
    ),
  info: Joi.string()
    .max(500)
    .required()
    .error(
      generateError(
        'El campo info debería existir y no exceder los 500 caracteres',
        400
      )
    ),
  category: Joi.string()
    .max(100)
    .required()
    .error(
      generateError(
        'El campo category debería existir y no exceder los 100 caracteres',
        400
      )
    ),
});

const newServiceCommentSchema = Joi.object().keys({
  idUser: Joi.number()
    .positive()
    .required()
    .greater(0)
    .error(
      generateError(
        'El campo idUser debe exisitir y debe ser un entero mayor que 0 ',
        400
      )
    ),
  content: Joi.string()
    .required()
    .max(280)
    .error(
      generateError(
        'El campo content debe existir y no debe exceder los 280 caracteres',
        400
      )
    ),
});

module.exports = { idServiceSchema, newServiceCommentSchema, newServiceSchema };

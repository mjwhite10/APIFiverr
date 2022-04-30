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

module.exports = { idServiceSchema };

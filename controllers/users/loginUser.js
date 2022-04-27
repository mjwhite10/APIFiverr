const { newUserSchema } = require('../../validators/userValidators');

const loginUser = async (req, res, next) => {
  try {
    //Validamos el body
    await newUserSchema.validateAsync(req.body);

    //Recojemos los datos del user con el email

    //Comparamos las passwords

    //Si la password no es valida...

    //Creamos el payload del token

    //Firmamos el token

    //Enviamos el token
    res.send({
      status: 'error',
      message: 'Not implemented',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { loginUser };

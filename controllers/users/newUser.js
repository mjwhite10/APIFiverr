const { createUser } = require('../../db/users');
const { newUserSchema } = require('../../validators/userValidators');

const newUser = async (req, res, next) => {
  try {
    //Validamos los datos de usuario
    await newUserSchema.validateAsync(req.body);

    //Extraemos los campos necesarios
    const { email, password, name } = req.body;

    const idUser = await createUser(email, password, name);

    res.send({
      status: 'Ok',
      message: `Creado el usuario con id ${idUser}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { newUser };

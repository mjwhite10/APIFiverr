const { getUserById } = require('../../db/users');
const { generateError } = require('../../helpers');
const { idUserSchema } = require('../../validators/userValidators');

const getUser = async (req, res, next) => {
  try {
    const { idUser } = req.params;

    //Validamos el id
    await idUserSchema.validateAsync(req.params);

    //Seleccionamos el usuario por id
    const user = await getUserById(idUser);

    //Si el usuario no existe...
    if (!user)
      throw generateError(`No existe ningún usuario con el id ${idUser}`, 404);

    const userInfo = {
      Name: user.name,
      Email: user.email,
      Avatar: user.avatar,
      Bio: user.bio,
    };

    res.send({
      status: 'ok',
      data: userInfo,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUser };

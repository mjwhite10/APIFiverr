const { getUserById } = require('../../db/users');
const { generateError } = require('../../helpers');
const { getUserSchema } = require('../../validators/userValidators');

const getUser = async (req, res, next) => {
  try {
    const { idUser } = req.params;

    //Validamos el id
    await getUserSchema.validateAsync(req.params);

    //Seleccionamos el usuario por id
    const user = await getUserById(idUser);

    //Si el usuario no existe...
    if (!user)
      throw generateError(`No existe ningún usuario con el id ${idUser}`, 404);

    const userInfo = {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
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

const { getUserById } = require('../../db/users');
const { generateError } = require('../../helpers');

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await getUserById(id);

    if (!user) {
      throw generateError(`no existe ningún usuario con el id ${id}`, 404);
    }

    const userInfo = { name: user.name, email: user.email, avatar: user.avatar, bio: user.bio}

    res.send({
      status: 'ok',
      data: userInfo,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUser };

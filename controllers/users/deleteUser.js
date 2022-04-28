const { deleteUser } = require('../../db/users');
const { deleteUserSchema } = require('../../validators/userValidators');

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteUser = await deleteUser(id);

    res.send({
      status: 'ok',
      message: `El usuario con id: ${id} fue borrado`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteUser };

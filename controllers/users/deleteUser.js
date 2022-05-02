const path = require('path');
const { deleteUserById, getUserById } = require('../../db/users');
const { generateError, deleteFile } = require('../../helpers');
const { idUserSchema } = require('../../validators/userValidators');

const deleteUser = async (req, res, next) => {
  try {
    const { idUser } = req.params;

    //Validamos el id
    await idUserSchema.validateAsync(req.params);

    //Comprobamos que el id del usuario que queremos modificar es
    // el mismo que firma la petición o bien es un admin
    if (req.auth.id !== Number(idUser) && req.auth.role !== 'admin')
      throw generateError(
        'No estas autorizado para modificar este usuario',
        403
      );

    //Verificamos que el usuario existe
    const user = await getUserById(idUser);
    if (!user)
      throw generateError(`No existe ningún usuario con el id ${idUser}`, 404);

    //Si tenia guardado un avatar lo eliminamos
    if (user.avatar) {
      const uploadPath = path.join(__dirname, '../../uploads/avatar');
      await deleteFile(path.join(uploadPath, user.avatar));
    }
    //Borramos el usuario
    await deleteUserById(idUser);

    res.send({
      status: 'ok',
      message: `El usuario con id: ${idUser} fue borrado`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteUser };

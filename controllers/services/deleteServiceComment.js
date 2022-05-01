const { getServiceById, deleteServiceCommentById } = require('../../db/services');
const { generateError } = require('../../helpers');

const deleteServiceComment = async (req, res, next) => {
  try {
    const { idService } = req.params;

    const service = await getServiceById(idService);
    if (!service)
      throw generateError(`No existe ningún usuario con el id ${idService}`, 404);

    await deleteServiceCommentById(idService);

    res.send({
      status: 'ok',
      message: `El comentario del servicio con id: ${idService} fue borrado`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteServiceComment };
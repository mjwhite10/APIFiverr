const {getServiceById, createServiceComment,} = require('../../db/services');
const { generateError } = require('../../helpers');

const newServiceComment = async (req, res, next) => {
  try {
    const { idService } = req.params;

    const { idUser } = req.body;

    const service = await getServiceById(idService);
    if (!service)
      throw generateError(`No existe ningún servicio con id ${idService}`, 404);
 
    const id = await createServiceComment(idService, idUser);

    res.send({
      status: 'error',
      message: `Creado el comentario con id ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { newServiceComment };

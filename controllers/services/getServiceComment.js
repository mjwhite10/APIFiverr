const { getServiceById, getServiceCommentById } = require('../../db/services');
const { generateError } = require('../../helpers');
const {
  getServiceCommentSchema,
} = require('../../validators/servicesValidators');

const getServiceComment = async (req, res, next) => {
  try {
    //Validamos los parametros
    await getServiceCommentSchema.validateAsync(req.params);
    const { idService, idComment } = req.params;

    //Comprobamos que existe el servicio
    const service = await getServiceById(idService);
    if (!service)
      throw generateError(`No existe ningún servicio con id ${idService}`, 404);

    //Comprobamos que existe el comentario
    const comment = await getServiceCommentById(idComment, idService);

    res.send({
      status: 'Ok',
      message: comment,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getServiceComment };

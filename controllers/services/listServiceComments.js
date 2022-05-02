const { getServiceById, getServiceComments } = require('../../db/services');
const { generateError } = require('../../helpers');
const { idServiceSchema } = require('../../validators/servicesValidators');

const listServiceComments = async (req, res, next) => {
  try {
    //Validamos los parametros
    await idServiceSchema.validateAsync(req.params);
    const { idService } = req.params;

    //Comprobamos que existe el servicio
    const service = await getServiceById(idService);
    if (!service)
      throw generateError(`No existe ningún servicio con id ${idService}`, 404);

    //Comprobamos que existe el comentario
    const data = await getServiceComments(idService);

    res.send({
      status: 'Ok',
      message: data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { listServiceComments };

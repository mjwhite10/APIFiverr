const { getServiceById } = require('../../db/services');
const { generateError } = require('../../helpers');
const { idServiceSchema } = require('../../validators/servicesValidators');

const getService = async (req, res, next) => {
  try {
    //Validamos los parámetros
    await idServiceSchema(req.params);
    const { idService } = req.params;

    const service = await getServiceById(idService);

    //Comprobamos que existe el servicio
    if (!service)
      throw generateError(
        `No existe ningún service con el id ${idService}`,
        404
      );

    //Devolvemos la información
    res.send({
      status: 'ok',
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getService };

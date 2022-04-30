const { getServiceById } = require('../../db/services');
const { generateError } = require('../../helpers');

const getService = async (req, res, next) => {
  try {
    const { getService } = req.params;

    const service = await getServiceById(idService);

    if (!service)
      throw generateError(`No existe ningún service con el id ${idService}`, 404);

    const serviceInfo = {
      title: service.title,
      info: service.info,
      file: service.file,
    };

    res.send({
      status: 'ok',
      data: serviceInfo,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getService };

const { getServiceById } = require('../../db/services');
const { generateError } = require('../../helpers');

const getService = async (req, res, next) => {
  try {
    const { idService } = req.params;

    const service = await getServiceById(idService);

    if (!service)
      throw generateError(`No existe ningún service con el id ${idService}`, 404);

    res.send({
      status: 'ok',
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getService };
const {
  getServiceSolutionByIdService,
  getServiceById,
} = require('../../db/services');
const { generateError } = require('../../helpers');
const { idServiceSchema } = require('../../validators/servicesValidators');

const getServiceSolution = async (req, res, next) => {
  try {
    //Validamos los parámetros
    await idServiceSchema.validateAsync(req.params);
    const { idService } = req.params;

    //Comprobamos que existe el servicio
    const service = await getServiceById(idService);
    if (!service)
      throw generateError(`No existe ningún servicio con id ${idService}`, 404);

    //Comprobamos que el servicio tiene asignada una solución
    const solution = await getServiceSolutionByIdService(idService);
    if (!solution)
      throw generateError(
        `El servicio con id ${idService} no tiene asignada ninguna solución`,
        404
      );
    //Enviamos la solucion
    await res.send({
      status: 'Ok',
      message: solution,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getServiceSolution };

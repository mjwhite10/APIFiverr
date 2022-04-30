const {
  getServiceById,
  getServiceSolutionByIdService,
  createServiceSolution,
} = require('../../db/services');
const { generateError } = require('../../helpers');
const { idServiceSchema } = require('../../validators/servicesValidators');
const newServiceSolution = async (req, res, next) => {
  try {
    //Validamos los parámetros
    await idServiceSchema.validateAsync(req.params);
    const { idService } = req.params;

    const { idUser } = req.body;

    //Comprobamos que existe el servicio
    const service = await getServiceById(idService);
    if (!service)
      throw generateError(`No existe ningún servicio con id ${idService}`, 404);

    //Comprobamos que el servicio NO tiene asignada una solución
    const solution = await getServiceSolutionByIdService(idService);
    if (solution)
      throw generateError(
        `El servicio con id ${idService} tiene asignada una solución. No se puede borrar`,
        404
      );

    //Creamos la solución
    const id = await createServiceSolution(idService, idUser);
    //Enviamos la respuesta
    res.send({
      status: 'Ok',
      message: `Creada la solución con id ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { newServiceSolution };

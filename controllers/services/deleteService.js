const {
  getServiceById,
  getServiceSolutionByIdService,
  deleteServiceById,
} = require('../../db/services');
const { generateError } = require('../../helpers');
const { idServiceSchema } = require('../../validators/servicesValidators');

const deleteService = async (req, res, next) => {
  try {
    //Validamos los parámetros
    await idServiceSchema.validateAsync(req.params);
    const { idService } = req.params;
    //Comprobamos que existe el servicio
    const service = await getServiceById(idService);
    console.log(service);
    if (!service)
      throw generateError(`No existe ningún servicio con id ${idService}`, 404);
    //Comprobamos que el servicio NO tiene asignada una solución
    const solution = await getServiceSolutionByIdService(idService);
    console.log(solution);
    if (solution || service.status != 'Unassigned')
      throw generateError(
        `El servicio con id ${idService} tiene asignada una solución. No se puede borrar`,
        404
      );

    //Borramos el servicio
    await deleteServiceById(idService);
    res.send({
      status: 'error',
      message: `El servicio con id ${idService} se eliminó correctamente`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteService };

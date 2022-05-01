const { createService, getIdCategory } = require('../../db/services');
const { generateError } = require('../../helpers');
const { newServiceSchema } = require('../../validators/servicesValidators');

const newService = async (req, res, next) => {
  try {
    //Validamos el body
    await newServiceSchema.validateAsync(req.body);
    const { title, info, file, category } = req.body;

    //Comprobamos que la categoría existe
    const idCategory = await getIdCategory(category);
    if (!idCategory)
      throw generateError(`La categoria ${category} no existe`, 404);

    //Creamos el servicio
    const idService = await createService(
      req.auth.id,
      title,
      info,
      file,
      idCategory.id
    );

    res.send({
      status: 'Ok',
      message: `Creado el Service con id ${idService}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { newService };

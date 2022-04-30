const { createService, getIdCategory } = require('../../db/services');

const newService = async (req, res, next) => {
  try {

    const { title, info, file, category } = req.body;

    const idCategory = await getIdCategory (category);

    const idService = await createService(title, info, file, idCategory);

    res.send({
      status: 'error',
      message: `Creado el Service con id ${idService}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { newService };
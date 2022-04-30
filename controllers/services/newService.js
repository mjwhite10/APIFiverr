const { createService } = require('../../db/services');

const newService = async (req, res, next) => {
  try {

    const { title, info, file, category } = req.body;

    const idService = await createService(title, info, file, category);

    res.send({
      status: 'error',
      message: `Creado el Service con id ${idService}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { newService };

const { searchServices } = require('../../db/services');

const listServices = async (req, res, next) => {
  try {
    const { search, order, direction } = req.query;

    console.log(search);
    const orderDirection =
      (direction && direction.toLowerCase()) === 'desc' ? 'DESC' : 'ASC';

    let orderBy;
    switch (order) {
      case 'title':
        orderBy = 'title';
        break;
      case 'status':
        orderBy = 'idStatus';
        break;
      case 'category':
        orderBy = 'idCategory';
        break;
      default:
        orderBy = 'createdAt';
        break;
    }

    const data = await searchServices(search, orderBy, orderDirection);
    res.send({
      status: 'Ok',
      message: data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { listServices };

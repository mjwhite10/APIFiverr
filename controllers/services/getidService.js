const getidService = async (req, res, next) => {
    try {
      res.send({
        status: 'error',
        message: 'Not implemented',
      });
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = { getidService };
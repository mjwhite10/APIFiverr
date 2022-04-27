const jwt = require('jsonwebtoken');
const { generateError } = require('../helpers');

const isUser = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw generateError('Falta la cabecera de Authorization', 401);
    }

    //Comprobamos que el token es correcto
    let token;
    try {
      token = jwt.verify(authorization, process.env.SECRET);
    } catch {
      throw generateError('Token incorrecto', 401);
    }
    //Metemos la info del token en la request para usarla en el controlador
    req.userId = token.id;
    //Saltamos al controlador
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { isUser };

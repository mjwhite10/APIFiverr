const jsonwebtoken = require('jsonwebtoken');
const { generateError } = require('../helpers');

const isUser = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    //Comprobamos que existe la cabecera authorization
    if (!authorization) {
      throw generateError('Es necesario una cabecera de autorizacion', 401);
    }

    //Si existe la cabecera, verificamos el token
    let token;
    try {
      token = jsonwebtoken.verify(authorization, process.env.SECRET);
    } catch {
      throw generateError('El token no es válido', 401);
    }
    //Metemeos la info del tojen en la request para que pueda usarla cualquier controlador
    req.userId = token.id;
    //Saltamos al siguiente middleware
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { isUser };

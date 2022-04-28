const jsonwebtoken = require('jsonwebtoken');
const { getUserById } = require('../db/users');
const { generateError } = require('../helpers');

const isUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    //Comprobamos que existe la cabecera authorization
    if (!authorization)
      throw generateError('Es necesaria la cabecera de autorizacion', 401);

    //Si existe la cabecera, verificamos el token
    let token;
    try {
      token = jsonwebtoken.verify(authorization, process.env.SECRET);
    } catch {
      throw generateError('El token no es válido', 401);
    }

    //Comprobamos que el usuario existe
    const user = await getUserById(token.id);

    if (!user)
      throw generateError(
        `No existe ningún usuario con el id ${token.id}`,
        404
      );
    //Metemeos la info del token en la request para que pueda usarla cualquier controlador
    req.auth = token;

    //Saltamos al siguiente middleware
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { isUser };

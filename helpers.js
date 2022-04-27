//Esta es una función que nos devuleve un error con su estado
const generateError = (message, status) => {
  const error = new Error(message);
  error.httpStatus = status;
  return error;
};

module.exports = { generateError };

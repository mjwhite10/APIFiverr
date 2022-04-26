require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

//Users controllers
const { deleteUser } = require('./controllers/users/deleteUser');
const { editPassword } = require('./controllers/users/editPassword');
const { editUser } = require('./controllers/users/editUser');
const { getUser } = require('./controllers/users/getUser');
const { loginUser } = require('./controllers/users/loginUser');
const { newUser } = require('./controllers/users/newUser');

//Services controllers

//Middlewares
const app = express();
app.use(express.json());

// Log de peticiones a la consola
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Users endpoints
app.post('/users', newUser);
app.get('/users/:idUser', getUser);
app.post('/users/login', loginUser);

//Services endpoints

//Middleware para las peticiones 404
app.use((req, res) => {
  console.warn('Error 404 Not Found');
  res.status(404).send({
    status: 'error',
    message: 'Not found',
  });
});

//Middleware de errores
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

//Lanzamos el server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Servidor funcionado en localhost:${port} 🙈`);
});

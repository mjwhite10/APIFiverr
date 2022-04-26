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
const { getServices } = require('./controllers/services/getServices');
const { getidService } = require('./controllers/services/getidService');
const { newService } = require('./controllers/services/newService');
const { editService } = require('./controllers/services/editService');
const { deleteService } = require('./controllers/services/deleteService');
const { newServiceSolution } = require('./controllers/services/newServiceSolution');
const { getServiceSolution } = require('./controllers/services/getServiceSolution');
const { editServiceSolution } = require('./controllers/services/editServiceSolution');
const { deleteServiceSolution } = require('./controllers/services/deleteServiceSolution');
const { newServiceComment } = require('./controllers/services/newServiceComment');
const { getServiceComments } = require('./controllers/services/getServiceComments');
const { editServiceComment } = require('./controllers/services/editServiceComment');
const { deleteServiceComment } = require('./controllers/services/deleteServiceComment');

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
app.put('/users/:idUser', editUser);
app.put('/users/:idUser/password', editPassword);
app.delete('users/:idUser', deleteUser);

//Services endpoints
app.get('/services', getServices);
app.get('/services/:idService', getidService);
app.post('/services', newService);
app.put('/services/:idService', editService);
app.delete('/services/:idService', deleteService);
app.post('/services/:idService/solution', newServiceSolution);
app.get('/services/:idService/solution', getServiceSolution);
app.put('/services/:idService/solution', editServiceSolution);
app.delete('/services/:idService/solution/:idSolution', deleteServiceSolution);
app.post('/services/:idService/comments', newServiceComment);
app.get('/services/:idService/comments', getServiceComments);
app.put('/services/:idService/comments/:idComment', editServiceComment);
app.delete('/services/:idService/comments/:idComment', deleteServiceComment);

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

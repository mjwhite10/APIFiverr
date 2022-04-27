require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

//#region Users controllers
const { deleteUser } = require('./controllers/users/deleteUser');
const { editPassword } = require('./controllers/users/editPassword');
const { editUser } = require('./controllers/users/editUser');
const { getUser } = require('./controllers/users/getUser');
const { loginUser } = require('./controllers/users/loginUser');
const { newUser } = require('./controllers/users/newUser');
//#endregion

//#region Services controllers
const { getServices } = require('./controllers/services/getServices');
const { getidService } = require('./controllers/services/getidService');
const { newService } = require('./controllers/services/newService');
const { editService } = require('./controllers/services/editService');
const { deleteService } = require('./controllers/services/deleteService');
const {
  newServiceSolution,
} = require('./controllers/services/newServiceSolution');
const {
  getServiceSolution,
} = require('./controllers/services/getServiceSolution');
const {
  editServiceSolution,
} = require('./controllers/services/editServiceSolution');
const {
  deleteServiceSolution,
} = require('./controllers/services/deleteServiceSolution');
const {
  newServiceComment,
} = require('./controllers/services/newServiceComment');
const {
  getServiceComment,
} = require('./controllers/services/getServiceComment');
const {
  listServiceComments,
} = require('./controllers/services/listServiceComments');
const {
  editServiceComment,
} = require('./controllers/services/editServiceComment');
const {
  deleteServiceComment,
} = require('./controllers/services/deleteServiceComment');
//#endregion

//#region Middlewares
const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//#endregion

//#region Users endpoints
app.post('/users', newUser);
app.get('/users/:idUser', getUser);
app.post('/users/login', loginUser);
app.put('/users/:idUser', editUser);
app.put('/users/:idUser/password', editPassword);
app.delete('users/:idUser', deleteUser);
//#endregion

//#region Services endpoints
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
app.get('/services/:idService/comments/:idComment', getServiceComment);
app.get('/services/:idService/comments', listServiceComments);
app.put('/services/:idService/comments/:idComment', editServiceComment);
app.delete('/services/:idService/comments/:idComment', deleteServiceComment);
//#endregion

//#region Middleware de errores

//Not found Middleware
app.use((req, res) => {
  console.warn('Error 404 Not Found');
  res.status(404).send({
    status: 'error',
    message: 'Not found',
  });
});

app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});
//#endregion

//Lanzamos el server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Servidor funcionado en localhost:${port} 🙈`);
});

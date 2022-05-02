require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
//Users controllers
const {
  deleteUser,
  editUserPassword,
  editUser,
  getUser,
  loginUser,
  newUser,
} = require('./controllers/users');
//Services controllers
const {
  listServices,
  getService,
  newService,
  editService,
  deleteService,
  newServiceSolution,
  getServiceSolution,
  editServiceSolution,
  deleteServiceSolution,
  newServiceComment,
  getServiceComment,
  listServiceComments,
  editServiceComment,
  deleteServiceComment,
} = require('./controllers/services');

//Middlewares
const { isUser } = require('./middlewares/isUser');
const { isAdmin } = require('./middlewares/isAdmin');
const app = express();
app.use(express.json());

// Log de peticiones a la consola
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Procesado de body tipo form-data
app.use(fileUpload());
app.use('/uploads', express.static('./uploads'));

//Users endpoints
app.post('/users', newUser);
app.get('/users/:idUser', isUser, getUser);
app.post('/users/login', loginUser);
app.put('/users/:idUser', isUser, editUser);
app.put('/users/:idUser/password', isUser, editUserPassword);
app.delete('/users/:idUser', isUser, isAdmin, deleteUser);
//Services endpoints//
//Services
app.get('/services', listServices);
app.get('/services/:idService', getService);
app.post('/services', isUser, newService);
app.put('/services/:idService', isUser, editService);
app.delete('/services/:idService', isUser, deleteService);
//Services solutions
app.post('/services/:idService/solution', isUser, newServiceSolution);
app.get('/services/:idService/solution', isUser, getServiceSolution);
app.put('/services/:idService/solution', isUser, editServiceSolution);
app.delete('/services/:idService/solution', isUser, deleteServiceSolution);
//Services comments
app.post('/services/:idService/comments', isUser, newServiceComment);
app.get('/services/:idService/comments/:idComment', getServiceComment);
app.get('/services/:idService/comments', listServiceComments);
app.put('/services/:idService/comments/:idComment', editServiceComment);
app.delete(
  '/services/:idService/comments/:idComment',
  isUser,
  deleteServiceComment
);

//Not found Middleware
app.use((req, res) => {
  console.warn('Error 404 Not Found');
  res.status(404).send({
    status: 'error',
    message: 'Not found',
  });
});

//Middlewares de errores
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

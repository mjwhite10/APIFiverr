# APIFiverr

Implementar una API que permita gestionar una web donde personas que necesiten algún
servicio digital puedan pedir ayuda a otros usuarios (estilo Fiverr). Por ejemplo: traducir un
texto, editar una foto, revisar un documento, etc… Solo necesidades que puedan realizarse
mediante un fichero digital.

## Estructura de base de datos

* Tabla de usuario:
  * id
  * email \*
  * password \*
  * name
  * role
  * bio
  * avatar
  * createdAt
  * modifiedAt

* Tabla de servicios:
  * id
  * idUser \*
  * title \*
  * info \*
  * file
  * idStatus \*
  * idCategory \*
  * createdAt
  * modifiedAt

* Tabla de estados de un servicio:
  * id
  * description \*

* Tabla de categorias de un servicio:
  * id
  * description \*

* Tabla de soluciones de servicios:
  * id
  * idService \*
  * idUser \*
  * file
  * startedAt
  * finishedAt

* Tabla de comentarios de un servicio:
  * id
  * content \*
  * idUser \*
  * idService \*

## Endpoints

### Endpoints de usuarios

* `POST /users` - Registrar un usuario. ✅

  * Cabecera auth: No
  * Body:
    * email
    * password
    * name
  * Retorna: mensaje que indica que el usuario ha sido creado y el id.

&nbsp;

* `GET /users/:idUser` - Obtener un usuario en concreto.

  * Cabecera auth: Sí
  * Path Params:
    * idUser
  * Retorna: info de usuario.
  
&nbsp;

* `POST /users/login` - Hacer login y retornar un token. ✅

  * Cabecera auth: No
  * Body:
    * email
    * password
  * Retorna: un token.
  
&nbsp;

* `PUT /users/:idUser` - Editar el nombre, email, bio y avatar de un usuario. ✅

  * Cabecera auth: Si
  * Path Params:
    * idUser
  * Body:
    * email
    * nombre
    * bio
    * avatar
  * Retorna: mensaje que indica que el usuario ha sido modificado.

&nbsp;

* `PUT /users/:idUser/password` - Editar la contraseña de un usuario. ✅

  * Cabecera auth: Si
  * Path Params:
    * idUser
  * Body:
    * oldPassword
    * newPassword
  * Retorna: mensaje que indica que la contraseña ha sido modificada.

&nbsp;

* `DELETE /users/:idUser` - Eliminar un usuario. ✅

  * Cabecera auth: Si
  * Path Params:
    * idUser
  * Retorna: mensaje que indica que el usuario ha sido eliminado.

&nbsp;

### Endpoints de servicios

* `GET /services` - Obtener un listado de todos los servicios.

  * Cabecera auth: No
  * Querystring:
    * search
    * order
    * direction
  * Retorna:  info de todos los servicios.

  &nbsp;

* `GET /services/:idService` - Obtener un servicio/necesidad en concreto

  * Cabecera auth: No
  * Path Params:
    * idService
  * Retorna: info de un servicio.

&nbsp;

* `POST /services` - Crear un servicio/necesidad

  * Cabecera auth: Si
  * Body:
    * title
    * info
    * file
  * Retorna: mensaje que indica que se ha generado el servicio

&nbsp;

* `PUT /services/:idService` - Editar un servicio/necesidad

  * Cabecera auth: Si
  * Path Params:
    * idService
  * Body:
    * title
    * info
    * file
    * status
  * Retorna: mensaje que indica que el servicio ha sido editado

&nbsp;

* `DELETE /services/:idService` - Borrar un servicio/necesidad

  * Cabecera auth: Si
  * Path Params
    * idService
  * Retorna: mensaje que indica que se ha generado el servicio

&nbsp;

* `POST /services/:idService/solution` - Crea una solución a una necesidad/servicio

  * Cabecera auth: Si
  * Path Params:
    * idService
  * Retorna: mensaje que indica que se ha generado una solución

&nbsp;

* `GET /services/:idService/solution` - Obtener la solución asignada a una necesidad/servicio

  * Cabecera auth: Si
  * Path Params:
    * idService
  * Retorna: información de la solución asignada

&nbsp;

* `PUT /services/:idService/solution` - Permite editar una solución

  * Cabecera auth: Si
  * Path Params:
    * idService
  * Body:
    * file
  * Retorna: mensaje que indica que se ha modificado la solución

&nbsp;

* `DELETE /services/:idService/solution/:idSolution` - Eliminar una solución

  * Cabecera auth: Si
  * Path Params:
    * idService
    * idSolution
  * Retorna: mensaje que indica que se elimino la solución

  &nbsp;

* `POST /services/:idService/comments` - Añade un comentario a una necesidad/servicio existente

  * Cabecera auth: Si
  * Path Params:
    * idService
  * Body:
    * content
  * Retorna: info de todos los comentarios

  &nbsp;

* `GET /services/:idService/comments/:idComment` - Devuelve un sólo comentario

  * Cabecera auth: Si
  * Path Params:
    * idService
    * idComment
  * Retorna: mensaje con el comentario

    &nbsp;

* `GET /services/:idService/comments` - Obtener los comentarios de una necesidad/servicio existente

  * Cabecera auth: Si
  * Path Params:
    * idService
  * Retorna: mensaje con toda la info de los comentarios

  &nbsp;
* `PUT /services/:idService/comments/:idComment` - Modificar un comentario

  * Cabecera auth: Si
  * Path Params:
    * idService
    * idComment
  * Body:
    * content
  * Retorna: mensaje que indica que se modificó el comentario

  &nbsp;

* `DELETE /services/:idService/comments/:idComment` - Eliminar un comentario

  * Cabecera auth: Si
  * Path Params:
    * idService
    * idComment
  * Retorna: mensaje que se eliminó el comentario

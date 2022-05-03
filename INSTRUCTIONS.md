# INSTRUCCIONES DE INSTALACIÓN

### 1º Instalar dependecias:
* Abrir un terminal de consola
* Abrir el directorio de la aplicación
* Ejecutar el siguiente comando: `npm i`

### 2º Generar la Base de datos:
* Si es la primera vez que vamos a desplegar la API
* Abrir un terminal SQL y ejecutar el archivo fiverr.sql
* Abrir un terminal de consola
* Abrir el directorio de la aplicación
* Ejecutar el siguiente comando: `node .\db\initDB.js`

### 3º Lanzar la aplicación
* Crear un archivo .env, basandose en el .env.example existente. Es importante que los credenciales SQL sean los del servidor local donde se ejecutará la API
* Abrir un terminal de consola
* Abrir el directorio de la aplicación
* Ejecutar el siguiente comando: `npm run dev`
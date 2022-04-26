require('dotenv').config();
const { getConnection } = require('./getDB');

async function main() {
  let connection;
  try {
    console.log('Inicio del script');

    connection = await getConnection();

    console.log('Borrando las tablas existentes...');
    await connection.query('DROP TABLE IF EXISTS services_comments');
    await connection.query('DROP TABLE IF EXISTS services_solution');
    await connection.query('DROP TABLE IF EXISTS services');
    await connection.query('DROP TABLE IF EXISTS services_status');
    await connection.query('DROP TABLE IF EXISTS services_categories');
    await connection.query('DROP TABLE IF EXISTS users');

    console.log('Creando la tabla users');
    await connection.query(`
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            name VARCHAR(100) NOT NULL,
            bio VARCHAR(300),
            avatar VARCHAR(100),
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            modifiedAt DATETIME 
        );`);

    console.log('Creando la tabla services_categories');
    await connection.query(`
        CREATE TABLE services_categories (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            descrption VARCHAR(100) NOT NULL
        );`);

    console.log('Creando la tabla services_status');
    await connection.query(`
        CREATE TABLE services_status (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            descrption VARCHAR(100) NOT NULL
        );`);

    console.log('Creando la tabla services');
    await connection.query(`
        CREATE TABLE services (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            idUser INTEGER NOT NULL,
            title VARCHAR(100) NOT NULL,
            info VARCHAR(500) NOT NULL,
            file VARCHAR(100),
            idStatus INTEGER NOT NULL,
            idCategory INTEGER NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            modifiedAt DATETIME,
            FOREIGN KEY (idUser) REFERENCES users(id),
            FOREIGN KEY (idStatus) REFERENCES services_status(id),
            FOREIGN KEY (idCategory) REFERENCES services_categories(id)
            );`);

    console.log('Creando la tabla services_solution');
    await connection.query(`
        CREATE TABLE services_solution (
           id INTEGER PRIMARY KEY AUTO_INCREMENT,
           idService INTEGER NOT NULL,
           idUser INTEGER NOT NULL,
           file VARCHAR (100),
           startedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
           finishedAt DATETIME,
           FOREIGN KEY (idService) REFERENCES services(id),
           FOREIGN KEY (idUser) REFERENCES users(id)
           );`);

    console.log('Creando la tabla services_comments');
    await connection.query(`
        CREATE TABLE services_comments (
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          content VARCHAR (280) NOT NULL,
          idUser INTEGER NOT NULL,
          idService INTEGER NOT NULL,
          FOREIGN KEY (idUser) REFERENCES users(id),
          FOREIGN KEY (idService) REFERENCES services(id)
    );`);

    console.log('Fin del script');
  } catch (error) {
    console.log('Error inesperado al crear la BBDD', error.message);
  } finally {
    if (connection) connection.release();
  }
}

main();

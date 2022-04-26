require('dotenv').config();
const faker = require('faker/locale/es');
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
            password TINYTEXT NOT NULL,
            name TINYTEXT NOT NULL,
            bio VARCHAR(500),
            avatar TINYTEXT,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            modifiedAt DATETIME 
        );`);

    console.log('Creando la tabla services_categories');
    await connection.query(`
        CREATE TABLE services_categories (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            description VARCHAR(100) NOT NULL
        );`);

    console.log('Creando la tabla services_status');
    await connection.query(`
        CREATE TABLE services_status (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            description VARCHAR(100) NOT NULL
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

    console.log('Creando usuarios...');
    const users = 10;

    for (let index = 0; index < users; index++) {
      const email = faker.internet.email();
      const password = faker.internet.password();
      const name = faker.name.findName();
      const bio = faker.lorem.sentences();

      await connection.query(
        `
        INSERT INTO users (email,password,name,bio)
        VALUES ("${email}",SHA2("${password}",512),"${name}","${bio}")`
      );
    }

    console.log('Creando status para los servicios...');

    const services_status = ['Unassigned', 'Assigned', 'Completed'];

    for (let index = 0; index < services_status.length; index++) {
      await connection.query(
        `
        INSERT INTO services_status (description)
        VALUES (?)`,
        [services_status[index]]
      );
    }

    console.log('Creando las categorias de los servicios...');

    const services_categories = [
      'Graphic arts and design',
      'Digital marketing',
      'Writing and translation',
      'Video and animation',
      'Music and sound',
      'Programming and technology',
      'Business',
      'Lifestyle',
      'Trends',
    ];

    for (let index = 0; index < services_categories.length; index++) {
      await connection.query(
        `
        INSERT INTO services_categories (description)
        VALUES (?)`,
        [services_categories[index]]
      );
    }

    console.log('Fin del script');
  } catch (error) {
    console.log('Error inesperado al crear la BBDD', error.message);
  } finally {
    if (connection) connection.release();
  }
}

main();

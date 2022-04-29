require('dotenv').config();
const path = require('path');
//const fs = require('fs/promises');
const bcrypt = require('bcrypt');
const faker = require('faker/locale/es');
const {
  processAndSaveImage,
  createPathIfNotExits,
  getRandomAvatar,
  deleteFile,
} = require('../helpers');
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
            role ENUM("normal", "admin") DEFAULT "normal" NOT NULL,
            name TINYTEXT NOT NULL,
            bio VARCHAR(500),
            avatar TINYTEXT,
            createdAt DATETIME NOT NULL,
            modifiedAt DATETIME,
            lastAuthUpdate DATETIME NOT NULL
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
            createdAt DATETIME NOT NULL,
            modifiedAt DATETIME,
            FOREIGN KEY (idUser) REFERENCES users(id),
            FOREIGN KEY (idStatus) REFERENCES services_status(id),
            FOREIGN KEY (idCategory) REFERENCES services_categories(id)
            );`);

    console.log('Creando la tabla services_solution');
    await connection.query(`
        CREATE TABLE services_solution (
           id INTEGER PRIMARY KEY AUTO_INCREMENT,
           idService INTEGER UNIQUE NOT NULL,
           idUser INTEGER NOT NULL,
           file VARCHAR (100),
           startedAt DATETIME NOT NULL,
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
          createdAt DATETIME NOT NULL,
          modifiedAt DATETIME,
          FOREIGN KEY (idUser) REFERENCES users(id),
          FOREIGN KEY (idService) REFERENCES services(id)
    );`);

    console.log('Creando usuarios...');

    console.log('Creando usuarios administradores');
    const adminPassHash = await bcrypt.hash(
      process.env.DEFAULT_ADMIN_PASSWORD,
      8
    );

    const uploadAvatarPath = path.join(__dirname, '../uploads/avatar');
    await deleteFile(uploadAvatarPath);
    await createPathIfNotExits(uploadAvatarPath);

    const avatar1 = await getRandomAvatar();
    const avatar2 = await getRandomAvatar();
    const fileAdmin1 = await processAndSaveImage(avatar1, uploadAvatarPath);
    const fileAdmin2 = await processAndSaveImage(avatar2, uploadAvatarPath);

    await connection.query(
      `
      INSERT INTO users (email,password,name,bio,role,lastAuthUpdate,avatar,modifiedAt,createdAt)
      VALUES('luna@hackaboss.com', ?, 'Luna', 'Lorem ipsum','admin',UTC_TIMESTAMP,?,UTC_TIMESTAMP,UTC_TIMESTAMP)
    `,
      [adminPassHash, fileAdmin1]
    );
    await connection.query(
      `
      INSERT INTO users (email,password,name,bio,role,lastAuthUpdate,avatar,modifiedAt,createdAt)
      VALUES('manu@hackaboss.com', ?, 'Manu', 'Lorem ipsum','admin',UTC_TIMESTAMP,?,UTC_TIMESTAMP,UTC_TIMESTAMP)
    `,
      [adminPassHash, fileAdmin2]
    );
    const users = 10;

    for (let index = 0; index < users; index++) {
      const email = faker.internet.email();
      const password = await bcrypt.hash(faker.internet.password(), 8);
      const name = faker.name.findName();
      const bio = faker.lorem.sentences();
      const avatar = await getRandomAvatar();
      const file = await processAndSaveImage(avatar, uploadAvatarPath);
      await connection.query(
        `
        INSERT INTO users (email,password,name,bio,lastAuthUpdate,avatar,modifiedAt,createdAt)
        VALUES (?,?,?,?,UTC_TIMESTAMP,?,UTC_TIMESTAMP,UTC_TIMESTAMP)`,
        [email, password, name, bio, file]
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
    console.log('Error inesperado al crear la BBDD', error);
  } finally {
    if (connection) connection.release();
  }
}

main();

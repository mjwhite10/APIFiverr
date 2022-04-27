const { generateError } = require('../helpers');
const { getConnection } = require('./getDB');
const bcrypt = require('bcrypt');
const createUser = async (email, password, name) => {
  let connection;
  try {
    connection = await getConnection();

    //Consultamos si existe un usuario con ese email
    const [user] = await connection.query(
      `
    SELECT id FROM users 
    WHERE email = ? `,
      [email]
    );
    //Si ya existía lanzamos un error
    if (user.length > 0) {
      throw generateError(
        'Ya existía un usuario en la base de datos con ese email',
        409
      );
    }
    //Encriptamos la password
    const passwordHash = await bcrypt.hash(password, 8);
    //Crear el usuario
    const [newUser] = await connection.query(
      `
    INSERT INTO users (email,password,name)
    VALUES (?,?,?)`,
      [email, passwordHash, name]
    );
    //Devolvemos el id
    return newUser.insertId;
  } finally {
    if (connection) connection.release();
  }
};

const getUserByEmail = async (email) => {
  let connection;
  try {
    connection = await getConnection();

    const [user] = await connection.query(
      `
    SELECT id,email,password 
    FROM users
    WHERE email = ?`,
      [email]
    );

    if (user.length === 0) {
      throw generateError(
        `No hay ningún usuario registrado con el email ${email}`,
        401
      );
    }
    console.log(user);
    return user[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { createUser, getUserByEmail };

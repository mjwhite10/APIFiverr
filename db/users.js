const bcrypt = require('bcrypt');

const { getConnection } = require('./getDB');

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
    SELECT id,email,password,role
    FROM users
    WHERE email = ?`,
      [email]
    );

    return user[0];
  } finally {
    if (connection) connection.release();
  }
};

const getUserById = async (id) => {
  let connection;
  try {
    connection = await getConnection();

    const [user] = await connection.query(
      `
    SELECT id,email,password,name,bio,avatar,role
    FROM users
    WHERE id = ?`,
      [id]
    );

    return user[0];
  } finally {
    if (connection) connection.release();
  }
};


const editUserById = async (email, name, bio, avatar, id) => {
  let connection;
  try {
    connection = await getConnection();

    await connection.query(
      `
    UPDATE users
    SET email = ?, name = ?, bio = ?, avatar = ?, modifiedAt = UTC_TIMESTAMP
    WHERE id = ?`,
      [email, name, bio, avatar, id]
    );
  }   finally{
      if (connection) connection.release()
    }
    
  }
const deleteUser = async (idUser) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      DELETE id FROM users WHERE id = ?
    `,
      [id]
    );

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};


module.exports = { createUser, getUserByEmail, getUserById, editUserById,deleteUser };

const { encryptPassword } = require('../helpers');
const { getConnection } = require('./getDB');

const createUser = async (email, password, name) => {
  let connection;
  try {
    connection = await getConnection();

    const passwordHash = encryptPassword(password);
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
  } finally {
    if (connection) connection.release();
  }
};
const deleteUserById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query(
      `
      DELETE FROM users 
      WHERE id = ?
    `,
      [id]
    );
  } finally {
    if (connection) connection.release();
  }
};

const editUserPasswordById = async (id, password) => {
  let connection;

  try {
    const passwordHash = encryptPassword(password);

    await connection.query(
      `
    UPDATE users
    SET password = ?, modifiedAt = UTC_TIMESTAMP
    WHERE id = ?`,
      [passwordHash, id]
    );
  } finally {
    if (connection) connection.release();
  }
};
module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  editUserById,
  deleteUserById,
  editUserPasswordById,
};

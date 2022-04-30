const { getConnection } = require('./getDB');

const searchServices = async (search, orderBy, orderDirection) => {
  let connection;
  try {
    connection = await getConnection();
    let queryResults;

    //Si se pasa un filtro de búsqueda...
    if (search) {
      queryResults = await connection.query(
        `
          SELECT S.id, U.name, S.title, S.info, S.file, SC.description as category, SS.description as status, S.createdAt
          FROM services AS S
          INNER JOIN services_categories AS SC
          ON S.idCategory = SC.id
          INNER JOIN services_status AS SS
          ON S.idStatus = SS.id
          INNER JOIN users AS U
          ON S.idUser = U.id
          WHERE S.title LIKE ? OR info LIKE ?
          ORDER BY ${orderBy} ${orderDirection}`,
        [`%${search}%`, `%${search}%`]
      );
    } else {
      queryResults = await connection.query(
        `
          SELECT S.id, U.name, S.title, S.info, S.file, SC.description as category, SS.description as status, S.createdAt
          FROM services AS S
          INNER JOIN services_categories AS SC
          ON S.idCategory = SC.id
          INNER JOIN services_status AS SS
          ON S.idStatus = SS.id
          INNER JOIN users AS U
          ON S.idUser = U.id
          ORDER BY ${orderBy} ${orderDirection}`
      );
      //Extraemos los resultados en un array
      const [results] = queryResults;
      return results;
    }
  } finally {
    if (connection) connection.release();
  }
};

const getServiceById = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    const [service] = await connection.query(
      `
        SELECT S.id, U.name, S.title, S.info, S.file, SC.description as category, SS.description as status, S.createdAt        FROM services AS S
        INNER JOIN services_categories AS SC
        ON S.idCategory = SC.id
        INNER JOIN services_status AS SS
        ON S.idStatus = SS.id
        INNER JOIN users AS U
        ON S.idUser = U.id
        WHERE S.id = ?`,
      [id]
    );
    return service[0];
  } finally {
    if (connection) connection.release();
  }
};

const createService = async (title, info, file, category) => {
  let connection;
  try {
    connection = await getConnection();

    const [newService] = await connection.query(
      `
      INSERT INTO services (title, info, file, idCategory, idStatus, createdAt)
      VALUES(?,?,?,?,?,UTC_TIMESTAMP)
    `,
      [title, info, file, category]
    );

    return newService.insertId;
  } finally {
    if (connection) connection.release();
  }
};

const getIdCategory = async (category) => {
  let connection;
  try {
    connection = await getConnection();

    const [idCategory] = await connection.query(
      `SELECT id FROM services_categories WHERE description = ? 
      `,
      [category]
    );

    return idCategory[0];

  } finally {
    if (connection) connection.release();
  }
}

module.exports = { searchServices, getServiceById, createService, getIdCategory };

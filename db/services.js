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
        SELECT S.id, U.name, S.title, S.info, S.file, SC.description as category, SS.description as status, S.createdAt
        FROM services AS S
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

const getServiceSolutionByIdService = async (idService) => {
  let connection;
  try {
    connection = await getConnection();
    const [solution] = await connection.query(
      `
      SELECT SS.id, U.name, SS.file, SS.startedAt, SS.finishedAt
      FROM services_solution AS SS
      INNER JOIN users AS U
      ON SS.idUser = U.id
      WHERE SS.idService = ?`,
      [idService]
    );
    return solution[0];
  } finally {
    if (connection) connection.release();
  }
};

const deleteServiceById = async (idService) => {
  let connection;
  try {
    connection = await getConnection();
    await connection.query(
      `
      DELETE FROM services
      WHERE id = ?`,
      [idService]
    );
  } finally {
    if (connection) connection.release();
  }
};

const createServiceSolution = async (idService, idUser) => {
  let connection;
  try {
    connection = await getConnection();
    await connection.query(`START TRANSACTION`);
    const [newSolution] = await connection.query(
      `
      INSERT INTO services_solution (idService,idUser,startedAt)
      VALUES (?,?,UTC_TIMESTAMP)`,
      [idService, idUser]
    );
    await connection.query(
      `
      UPDATE services
      SET idStatus = 2
      WHERE id = ?`,
      [idService]
    );
    await connection.query(`COMMIT`);
    return newSolution.insertId;
  } catch (error) {
    await connection.query(`ROLLBACK`);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  searchServices,
  getServiceSolutionByIdService,
  getServiceById,
  deleteServiceById,
  createServiceSolution,
};

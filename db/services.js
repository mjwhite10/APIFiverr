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
          SELECT S.id, S.idUser, U.name as user, S.title, S.info, S.file, SC.description as category, SS.description as status, S.createdAt
          FROM services AS S
          INNER JOIN services_categories AS SC
          ON S.idCategory = SC.id
          INNER JOIN services_status AS SS
          ON S.idStatus = SS.id
          INNER JOIN users AS U
          ON S.idUser = U.id
          WHERE S.title LIKE '%${search}%' OR info LIKE '%${search}%'
          ORDER BY ${orderBy} ${orderDirection}`
      );
    } else {
      queryResults = await connection.query(
        `
          SELECT S.id, S.idUser, U.name as user, S.title, S.info, S.file, SC.description as category, SS.description as status, S.createdAt
          FROM services AS S
          INNER JOIN services_categories AS SC
          ON S.idCategory = SC.id
          INNER JOIN services_status AS SS
          ON S.idStatus = SS.id
          INNER JOIN users AS U
          ON S.idUser = U.id
          ORDER BY ${orderBy} ${orderDirection}`
      );
    }
    //Extraemos los resultados en un array
    const [results] = queryResults;
    return results;
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
        SELECT S.id, S.idUser, U.name as user, S.title, S.info, S.file, SC.description as category, SS.description as status, S.createdAt
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

const createService = async (idUser, title, info, file, category) => {
  let connection;
  try {
    connection = await getConnection();

    const [newService] = await connection.query(
      `
      INSERT INTO services (idUser,title, info, file, idCategory, idStatus, createdAt)
      VALUES(?,?,?,?,?,1,UTC_TIMESTAMP)
    `,
      [idUser, title, info, file, category]
    );
    return newService.insertId;
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
      SELECT SS.id, SS.idUser, U.name as user, SS.file, SS.startedAt, SS.finishedAt
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

const getIdCategory = async (category) => {
  let connection;
  try {
    connection = await getConnection();

    const [idCategory] = await connection.query(
      `SELECT id 
      FROM services_categories WHERE description = ? 
      `,
      [category]
    );

    return idCategory[0];
  } finally {
    if (connection) connection.release();
  }
};

const deleteServiceById = async (idService) => {
  let connection;
  try {
    connection = await getConnection();
    await connection.query(`START TRANSACTION`);
    await connection.query(
      `
    DELETE FROM services_comments
    WHERE idService = ?`,
      [idService]
    );
    await connection.query(
      `
      DELETE FROM services
      WHERE id = ?`,
      [idService]
    );
  } catch (error) {
    await connection.query(`ROLLBACK`);
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

const createServiceComment = async (idUser, idService, content) => {
  let connection;
  try {
    connection = await getConnection();

    const [newServiceComment] = await connection.query(
      `
      INSERT INTO services_comments (idUser, idService, content, createdAt)
      VALUES(?,?,?,UTC_TIMESTAMP)
    `,
      [idUser, idService, content]
    );
    return newServiceComment.insertId;
  } finally {
    if (connection) connection.release();
  }
};

const deleteServiceCommentById = async (idComment) => {
  let connection;
  try {
    connection = await getConnection();
    await connection.query(
      `
      DELETE FROM services_comment
      WHERE id = ?`,
      [idComment]
    );
  } finally {
    if (connection) connection.release();
  }
};

const editServiceById = async (idService, title, info, file, category) => {
  let connection;
  try {
    connection = await getConnection();

    await connection.query(
      `
      UPDATE services
      SET title = ?, info = ?, file = ?, idCategory = ?, modifiedAt = UTC_TIMESTAMP
      WHERE id = ?`,
      [title, info, file, category, idService]
    );
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
  createService,
  getIdCategory,
  createServiceComment,
  deleteServiceCommentById,
  editServiceById,
};

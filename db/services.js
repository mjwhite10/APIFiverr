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
          SELECT S.id, U.name, S.title, S.info, S.file, SC.description, SS.description, S.createdAt
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
          SELECT S.id, U.name, S.title, S.info, S.file, SC.description, SS.description, S.createdAt
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

module.exports = { searchServices };

const mysql = require('mysql2/promise');
const config = require('config');

const pool = mysql.createPool(config.db);

async function transaction(pool, callback) {
  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    await callback(connection);
    await connection.commit();
  } catch (err) {
    await connection.rollback();
    // Throw the error again so others can catch it.
    throw err;
  } finally {
    connection.release();
  }
};

// Get all active campaigns of given user
async function getData(articleId) {
  let statement = `SELECT * FROM articles WHERE id = ?`;
  const result = await pool.query(statement, [articleId]);
  return result[0][0].content;
}

async function getAllData() {
  let statement = `SELECT id, title, description FROM articles`;
  const result = await pool.query(statement, []);
  return result[0];
}

async function getPages() {
  let statement = `SELECT * FROM pages`;
  const result = await pool.query(statement, []);
  return result[0];
}

module.exports = {
  getData,
  getPages,
  getAllData,
};


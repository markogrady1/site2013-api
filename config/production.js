module.exports = {
  port: 3000,
  db: {
    host: process.env.API_DB_HOST,
    port: process.env.API_DB_PORT,
    user: process.env.API_DB_USER,
    database: process.env.API_DB_DATABASE,
    password: process.env.API_DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  }
};
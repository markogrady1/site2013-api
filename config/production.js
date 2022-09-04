module.exports = {
  port: 3312,
  db: {
    host: process.env.API_HOST,
    port: process.env.API_PORT,
    user: process.env.API_USER,
    database: process.env.API_DATABASE,
    password: process.env.API_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  }
};
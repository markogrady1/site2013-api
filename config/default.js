module.exports = {
  port: 3311,
  db: {
    host: 'localhost',
    port: 3309,
    user: 'test',
    database: 'blog-api',
    password: 'ppc',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  },
}

const dotenv = require('dotenv').config();

const env = process.env;

const config = {
  db: {
    host: env.DB_HOST || 'host',
    user: env.DB_USER || 'user',
    password: env.DB_PASSWORD || 'password',
    database: env.DB_NAME || 'database',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true,
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};

module.exports = config;

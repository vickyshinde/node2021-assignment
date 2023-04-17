const dotenv = require('dotenv').config();

const env = process.env;

const config = {
  db: {
    host: env.DB_HOST || 'localhost',
    user: env.DB_USER || 'root',
    password: env.DB_PASSWORD || '',
    database: env.DB_NAME || 'studentDB',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true,
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};

module.exports = config;

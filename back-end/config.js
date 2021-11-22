const env = process.env;

const config = {
  db: {
    host: env.DB_HOST || 'localhost',
    user: env.DB_USER || 'root',
    password: env.DB_PASSWORD || 'webonise123#',
    database: env.name || 'collageDB',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true,
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};

module.exports = config;

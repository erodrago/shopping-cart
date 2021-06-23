require('dotenv').config();

const config = {
  port: process.env.PORT || 8000,
  database: process.env.DATABASE,
  username: process.env.DATABASE_USER,
  databaseDialect: process.env.DATABASE_DIALECT || 'mysql',
  env: process.env.NODE_ENV || 'development',
  password: process.env.PASSWORD || null,
  host: process.env.HOST,
};

module.exports = config;
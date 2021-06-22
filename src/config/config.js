require("dotenv/config")

module.exports = {

  development: {
    database: process.env.MYSQL_DB,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    dialect: 'mysql'
  },
  test: {
    database: process.env.MYSQL_TEST_DB,
    username: process.env.MYSQL_TEST_USER,
    password: process.env.MYSQL_TEST_PASSWORD,
    host: process.env.MYSQL_TEST_HOST,
    dialect: 'mysql'
  },
  production: {
    database: process.env.MYSQL_PROD_DB,
    username: process.env.MYSQL_PROD_USER,
    password: process.env.MYSQL_PROD_PASSWORD,
    host: process.env.MYSQL_PROD_HOST,
    dialect: 'mysql'
  },

}


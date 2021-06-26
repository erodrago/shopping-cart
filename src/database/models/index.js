'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const { env } = require('../../config/config.js');
const dbConfig = require(__dirname + '/../../config/database.js');
const db = {};

const envDbConfig = dbConfig[env];
let sequelize;
if (dbConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[envDbConfig.use_env_variable], dbConfig);
} else {
  sequelize = new Sequelize(envDbConfig.database, envDbConfig.username, envDbConfig.password, envDbConfig);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
// db.Sequelize = Sequelize;

module.exports = db;

const Sequelize = require("sequelize");

const db = new Sequelize('messenger', 'postgres', 'potghpo', {
  host: 'localhost',
  logging: false,
  dialect: 'postgres'
});

module.exports = db;

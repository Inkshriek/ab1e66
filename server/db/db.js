const Sequelize = require("sequelize");

const db = new Sequelize('messenger', 'postgres', '', {
  host: 'localhost',
  logging: false,
  dialect: 'postgres'
});

module.exports = db;

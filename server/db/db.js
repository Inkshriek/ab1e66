const Sequelize = require("sequelize");

const db = new Sequelize('messenger', 'postgres', process.env.PASSWORD, {
  host: 'localhost',
  logging: false,
  dialect: 'postgres'
});

module.exports = db;

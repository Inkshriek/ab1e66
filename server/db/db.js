const Sequelize = require("sequelize");
const { REACT_APP_PASSWORD } = process.env;

const db = new Sequelize('messenger', 'postgres', REACT_APP_PASSWORD, {
  host: 'localhost',
  logging: false,
  dialect: 'postgres'
});

module.exports = db;

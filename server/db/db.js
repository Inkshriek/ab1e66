const Sequelize = require("sequelize");
require('dotenv').config();

const db = new Sequelize('messenger', 'postgres', process.env.REACT_APP_PASSWORD, {
  host: 'localhost',
  logging: false,
  dialect: 'postgres'
});

module.exports = db;

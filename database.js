const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("codeConnector", "user", "password", {
  dialect: "sqlite",
  host: "./codeConnectorDb.sqlite",
});

module.exports = sequelize;
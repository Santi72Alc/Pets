const { Sequelize } = require("sequelize");
const mysql = require("mysql2/promise");

const configDB_mysql = {
  database: "pets_db",
  userName: "root",
  userPassword: "",
  options: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
  },
};

// Database, user, password, { config }
const sequelize = new Sequelize(
  configDB_mysql.database,
  configDB_mysql.userName,
  configDB_mysql.userPassword,
  configDB_mysql.options
);

const initDB = async (creaTable = false) => {
  if (creaTable) sequelize.sync();
  const conn = await mysql.createConnection({
    host: configDB_mysql.options.host,
    port: configDB_mysql.options.port,
    user: configDB_mysql.userName,
    password: configDB_mysql.userPassword,
    database: "pets_db",
  });
};

module.exports = { sequelize, configDB: configDB_mysql, initDB };

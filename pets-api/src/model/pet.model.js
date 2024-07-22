// const petDB = require("../db/pets.connection");
const { DataTypes } = require("sequelize");

// DB connection
const sequelize = require("../db/pets.connection");

const Pet = sequelize.define("pets", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  breed: { type: DataTypes.STRING, defaultValue: "Common breed", allowNull: false },
  owner: { type: DataTypes.STRING, defaultValue: "No owner", allowNull: false },
});

module.exports = Pet;

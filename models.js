const { Sequelize, DataTypes } = require("sequelize");

// Initialize Sequelize
const sequelize = new Sequelize("wundergraph_test", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
  logging: console.log, // Enable logging to see SQL queries
});

// Define User model
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = { User, sequelize };

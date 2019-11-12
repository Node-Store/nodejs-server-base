const Sequelize = require("sequelize");

const { mysql } = require("../config/index");

const sequelize = new Sequelize(
  mysql.databaseName,
  mysql.username,
  mysql.password,
  {
    host: mysql.host,
    port: mysql.port,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    timezone: "+08:00"
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("=== 🎉  🚌  🚌  🚌   DATABASE Connect Success! ===");
  })
  .catch(err => {
    console.error(
      `=== 😡  🚧  🚧  🚧   DATABASE  Connect Failed! Error Is: ${err} ===`
    );
  });

// 同步数据库模型到数据库
sequelize
  .sync({ logging: mysql.logging })
  .then(() => console.log("=== 🎉  🎉  🎉  DATABASE Async Success! === "));

module.exports = sequelize;

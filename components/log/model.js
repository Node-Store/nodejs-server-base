const sequelize = require("../../sql/index");
const CONFIG = require("../../config/index");

const force = CONFIG.mysql.forceUpdateModel;

const model = sequelize.define(
  "log",
  {
    id: {
      type: sequelize.Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      comment: "自增ID"
    },

    key: {
      type: sequelize.Sequelize.TEXT,
      comment: "log的键名"
    },

    value: {
      type: sequelize.Sequelize.TEXT,
      comment: "log的值",
      paranoid: true
    }
  },
  {
    underscored: true
  }
);

model.sync({ force: force }).then(() => {
  console.info("=== 🎉  🎉  🎉 User Model Async Success! === ");
});

module.exports = model;

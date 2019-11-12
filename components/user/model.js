const sequelize = require("../../sql/index");
const CONFIG = require("../../config/index");

const force = CONFIG.mysql.forceUpdateModel;

const model = sequelize.define(
  "user",
  {
    id: {
      type: sequelize.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: "用户Id 自动生成"
    },

    phone: {
      type: sequelize.Sequelize.BIGINT,
      comment: "手机号",
      unique: true
    },

    username: {
      type: sequelize.Sequelize.STRING,
      comment: "用户名"
    },

    password: {
      type: sequelize.Sequelize.STRING,
      comment: "密码"
    },

    department: {
      type: sequelize.Sequelize.STRING,
      comment: "部门",
      defaultValue: null
    },

    avatar: {
      type: sequelize.Sequelize.STRING,
      comment: "头像",
      defaultValue: null
    },

    status: {
      type: sequelize.Sequelize.INTEGER,
      comment: "0为默认状态",
      defaultValue: 0
    },
    email: {
      type: sequelize.Sequelize.STRING,
      comment: "用户邮箱",
      default: null,
      unique: true
    },
    created: {
      defaultValue: sequelize.Sequelize.NOW,
      type: sequelize.Sequelize.DATE,
      comment: "用户的创建时间"
    }
  },
  {
    underscored: true,
    freezeTableName: true,
    paranoid: true
  }
);

model.sync({ force: force }).then(() => {
  console.info("=== 🎉  🎉  🎉 , User Model Async Success! === ");
});

module.exports = model;

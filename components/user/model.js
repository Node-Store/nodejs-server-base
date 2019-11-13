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

    name: {
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
    // 不使用驼峰式命令规则，这样会在使用下划线分隔
    // 这样 updatedAt 的字段名会是 updated_at
    underscored: true,

    // 添加时间戳属性 (updatedAt, createdAt)
    timestamps: true,

    // 不从数据库中删除数据，而只是增加一个 deletedAt 标识当前时间
    // paranoid 属性只在启用 timestamps 时适用
    paranoid: true,

    // 禁止修改表名. 默认情况下
    // sequelize会自动使用传入的模型名（define的第一个参数）做为表名
    // 如果你不想使用这种方式你需要进行以下设置
    freezeTableName: true,

    // 定义表名
    tableName: "user"
  }
);

model.sync({ force: force }).then(() => {
  console.info("=== 🎉  🎉  🎉 , User Model Async Success! === ");
});

module.exports = model;

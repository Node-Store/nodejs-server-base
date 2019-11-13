const { logging } = require("../../config/index");

const model = require("./model");

const dao = {
  // 增加
  add: async function(addJson) {
    let data = await model.create(addJson, {
      logging: logging
    });
    return data;
  },

  // 用户注册
  register: async function(userJson) {
    const data = await model.findOrCreate({
      where: {
        phone: userJson.phone
      },
      logging: logging
    });
    return data;
  },

  // 批量增加
  batchCreate: async function(users) {
    let data = await model.bulkCreate(users, {
      logging: logging
    });
    return data;
  },

  // 删除
  delete: async function(id = null) {
    let data = await model.destroy({
      where: {
        id: id
      },
      logging: logging
    });
    return data;
  },

  // 更新
  update: async function(updateJson = {}, whereJson = {}) {
    let data = await model.update(updateJson, {
      where: whereJson,
      logging: logging,
      attributes: {
        exclude: [
          "password",
          "created_at",
          "deleted_at",
          "updated_at",
          "status",
          "createdAt",
          "created",
          "updatedAt",
          "deletedAt"
        ]
      }
    });
    return data;
  },

  // 查找
  search: async function(whereJson = {}, needDel = true) {
    let data = await model.findOne({
      where: whereJson,
      attributes: {
        exclude: [
          "password",
          "created_at",
          "deleted_at",
          "updated_at",
          "status",
          "createdAt",
          "created",
          "updatedAt",
          "deletedAt"
        ]
      },
      paranoid: needDel
    });
    return data;
  },

  // 分页
  list: async function(whereJson = {}, page = 1, pageSize = 10) {
    let data = await model.findAndCountAll({
      logging: logging,
      where: whereJson,
      offset: pageSize * (page - 1),
      limit: pageSize,
      attributes: {
        exclude: [
          "password",
          "created_at",
          "deleted_at",
          "updated_at",
          "status",
          "createdAt",
          "created",
          "updatedAt",
          "deletedAt"
        ]
      }
    });

    return data;
  },

  // 模糊搜索
  all: async function(whereJson = {}) {
    let data = await model.findAndCountAll({
      logging: logging,
      where: whereJson
    });
    return data;
  },

  // 求和
  sum: async function(column, whereJson) {
    let data = await model.sum(column, {
      where: whereJson
    });
    return data;
  },

  // 统计
  count: async function() {
    let data = await model.count({
      logging: logging
    });
    return data;
  },

  // 自增
  increment: async function(columnArray = [], whereJson = {}, by = 1) {
    let data = await model.increment(columnArray, {
      by: by,
      where: whereJson
    });
    return data;
  }
};

module.exports = dao;

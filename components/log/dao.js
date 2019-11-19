const { logging } = require("../../config/index");

const model = require("./model");

const dao = {
  add: async function(addJson) {
    let data = await model.create(addJson, {
      logging: logging
    });
    return data;
  },

  delete: async function(id = null) {
    let data = await model.destroy({
      where: {
        id: id
      },
      logging: logging
    });
    return data;
  },

  update: async function(updateJson = {}, whereJson = {}) {
    let data = await model.update(updateJson, {
      where: whereJson,
      logging: logging
    });
    return data;
  },

  list: async function(whereJson = {}, page = 1, pageSize = 10) {
    let data = await model.findAndCountAll({
      logging: logging,
      where: whereJson,
      offset: pageSize * (page - 1),
      limit: pageSize
    });
    return data;
  },

  all: async function(whereJson = {}) {
    let data = await model.findAndCountAll({
      logging: logging,
      where: whereJson
    });
    return data;
  },

  sum: async function(column, whereJson) {
    let data = await model.sum(column, {
      where: whereJson
    });
    return data;
  },

  count: async function() {
    let data = await model.count({
      logging: logging
    });
    return data;
  },

  increment: async function(columnArray = [], whereJson = {}, by = 1) {
    let data = await model.increment(columnArray, {
      by: by,
      where: whereJson
    });
    return data;
  }
};

module.exports = dao;

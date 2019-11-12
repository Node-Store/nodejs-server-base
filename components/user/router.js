const add = require("./apis/add");
const del = require("./apis/delete");
const batchCreate = require("./apis/batchCreate");
const list = require("./apis/list");
const login = require("./apis/login");
const modify = require("./apis/modify");
const profile = require("./apis/profile");
const search = require("./apis/search");
const update = require("./apis/update");

const registerRoute = function(router) {
  router.use("/api/user/add", add);
  router.use("/api/user/del", del);
  router.use("/api/user/batchCreate", batchCreate);
  router.use("/api/user/list", list);
  router.use("/api/user/login", login);
  router.use("/api/user/modify", modify);
  router.use("/api/user/profile", profile);
  router.use("/api/user/search", search);
  router.use("/api/user/update", update);
};

module.exports = registerRoute;

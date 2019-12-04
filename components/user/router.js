const add = require("./apis/add");
const del = require("./apis/delete");
const list = require("./apis/list");
const login = require("./apis/login");
const modify = require("./apis/modify");
const profile = require("./apis/profile");
const update = require("./apis/update");
const register = require("./apis/register");
const logout = require("./apis/logout");
const batchCreate = require("./apis/batchCreate");

const registerRoute = function(router) {
  router.use("/api/user/add", add);
  router.use("/api/user/delete", del);
  router.use("/api/user/list", list);
  router.use("/api/user/login", login);
  router.use("/api/user/modify", modify);
  router.use("/api/user/profile", profile);
  router.use("/api/user/update", update);
  router.use("/api/user/register", register);
  // router.use("/api/user/signup", register);
  router.use("/api/user/logout", logout);

  router.use("/api/user/batchCreate", batchCreate);
};

module.exports = registerRoute;

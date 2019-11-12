const registerUser = require("./components/user/router");

const routes = function(router) {
  registerUser(router);
};

module.exports = routes;

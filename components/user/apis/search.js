const router = require("koa-router")();
const CODE = require("../code");
const dao = require("../dao");

router.get("/", async function(ctx, next) {
  // Get 请求在 ctx.request.query 对象上面
  let body = ctx.request.query;

  const { email } = body;

  let whereJson = {};

  if (email) {
    whereJson = {
      email
    };
  } else {
    return ctx.return(-1, CODE.USER_NOT_VALID_QUERY, null);
  }

  let data = await dao.search(whereJson);

  if (data) {
    ctx.sessions = {
      name: "id"
    };
    return ctx.return(0, CODE.USER_NORMAL_SUCCESS, data);
  } else {
    return ctx.return(-1, CODE.USER_NOT_EXIST, null);
  }
});

module.exports = router.routes();

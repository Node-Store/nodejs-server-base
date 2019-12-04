const router = require("koa-router")();

const md5 = require("../../../utils/libs/md5");
const CODE = require("../code");
const dao = require("../dao");

router.post("/", async function(ctx, next) {
  ctx.cookies.set("user_id", null);

  return ctx.return(0, CODE.USER_LOGOUT_SUCCESS, null);
});

module.exports = router.routes();

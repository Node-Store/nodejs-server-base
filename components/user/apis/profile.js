const router = require("koa-router")();
const CODE = require("../code");
let dao = require("../dao");

router.get("/", async function(ctx, next) {
  let post = ctx.request.query;

  let res_user = await dao.search({
    id: post.id
  });

  if (!res_user) {
    return ctx.return(-1, CODE.USER_NOT_EXIST, null);
  }

  return ctx.return(-1, CODE.USER_NORMAL_SUCCESS, res_user);
});

module.exports = router.routes();

const router = require("koa-router")();
const CODE = require("../code");
let dao = require("../dao");

router.get("/", async function(ctx, next) {
  let post = ctx.request.query;

  let res_user = await dao.search(
    {
      email: post.email
    },
    true
  );

  if (!res_user) {
    return ctx.return(-1, CODE.USER_NOT_EXIST, null);
  }

  ctx.session.user = res_user;

  return ctx.return(-1, CODE.USER_NORMAL_SUCCESS, res_user);
});

module.exports = router.routes();

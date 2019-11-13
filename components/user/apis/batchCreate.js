const CODE = require("../code");

const router = require("koa-router")();

const md5 = require("../../../utils/libs/md5");

const dao = require("../dao");

// TODO: 待完善校验
router.post("/", async function(ctx, next) {
  let post = ctx.request.body;

  if (Array.isArray(post)) {
    post.map(r => (r.password = md5(r.password)));
  }

  await dao.batchCreate(post);

  return ctx.return(0, CODE.USER_CREATE_SUCCESS, null);
});

module.exports = router.routes();

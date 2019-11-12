const CODE = require("../code");

let router = require("koa-router")();

let md5 = require("../../../utils/libs/md5");

let dao = require("../dao");

router.post("/", async function(ctx, next) {
  let post = ctx.request.body;

  if (Array.isArray(post)) {
    post.map(r => (r.password = md5(r.password)));
  }

  await dao.batchCreate(post);

  return ctx.return(CODE.USER_CREATE_SUCCESS, "User added success!", {});
});

module.exports = router.routes();

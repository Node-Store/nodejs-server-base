const router = require("koa-router")();
const CODE = require("../code");
let dao = require("../dao");

router.put("/", async function(ctx, next) {
  let get = ctx.request.query;
  let post = ctx.request.body;

  whereJson = {
    email: post.email
  };

  const isExisted = await dao.search(whereJson);

  if (!isExisted) {
    return ctx.return(-1, CODE.USER_NORMAL_FAILED, null);
  }

  if (!post.password) {
    return ctx.return(-1, CODE.USER_NORMAL_FAILED, null);
  }

  let data = await dao.update(
    {
      password: md5(post.password)
    },
    {
      email: post.email
    }
  );

  return ctx.return(CODE.USER_NORMAL_SUCCESS, null);
});

module.exports = router.routes();

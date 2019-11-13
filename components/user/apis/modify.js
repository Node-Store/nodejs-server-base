const router = require("koa-router")();
const CODE = require("../code");
const dao = require("../dao");

const md5 = require("../../../utils/libs/md5");

router.put("/", async function(ctx, next) {
  let post = ctx.request.body;

  whereJson = {
    id: post.id
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
      id: post.id
    }
  );

  return ctx.return(0, CODE.USER_NORMAL_SUCCESS, null);
});

module.exports = router.routes();

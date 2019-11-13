const router = require("koa-router")();
const CODE = require("../code");
const dao = require("../dao");

const md5 = require("../../../utils/libs/md5");

router.put("/", async function(ctx, next) {
  let post = ctx.request.body;

  if (post.password) {
    post.password = md5(post.password);
  }

  const where = {
    id: post.id
  };

  const isExisted = await dao.search({
    id: post.id
  });

  if (isExisted) {
    await dao.update(post, where);
    return ctx.return(0, CODE.USER_NORMAL_SUCCESS, null);
  } else {
    return ctx.return(-1, CODE.USER_NOT_EXIST, null);
  }
});

module.exports = router.routes();

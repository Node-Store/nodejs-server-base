const router = require("koa-router")();
const CODE = require("../code");
const dao = require("../dao");

const md5 = require("../../../utils/libs/md5");

router.put("/", async function(ctx, next) {
  let get = ctx.request.query;
  let post = ctx.request.body;

  if (post.password) {
    post.password = md5(post.password);
  }

  // 暂时通过作为 邮箱 唯一标识进行更新
  const where = {
    email: post.email
  };

  const isExisted = await dao.search({
    email: post.email
  });

  if (isExisted) {
    await dao.update(post, where);
    return ctx.return(0, CODE.USER_NORMAL_SUCCESS, null);
  } else {
    return ctx.return(-1, CODE.USER_NOT_EXIST, null);
  }
});

module.exports = router.routes();

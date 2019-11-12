const router = require("koa-router")();
const CODE = require("../code");
let dao = require("../dao");

router.post("/", async function(ctx, next) {
  let post = ctx.request.body;

  // FIXME: 区别 字符串 STRING 和 TEXT
  const email = post.email;

  whereJson = {
    email: String(email)
  };

  const isExisted = await dao.search(whereJson);

  if (isExisted) {
    const whereJson = {
      email: post.email
    };

    const updateJson = {
      status: -1
    };

    // 删除的就不能在更新
    await dao.update(updateJson, whereJson);

    await dao.delete(post.email);

    return ctx.return(0, CODE.USER_DELETE_SUCCESS, {});
  } else {
    return ctx.return(-1, CODE.USER_NOT_EXIST, {});
  }
});

module.exports = router.routes();

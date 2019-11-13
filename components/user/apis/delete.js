const router = require("koa-router")();
const CODE = require("../code");
const dao = require("../dao");

router.post("/", async function(ctx) {
  let post = ctx.request.body;

  // FIXME: 区别 字符串 STRING 和 TEXT
  const id = post.id;

  const isExisted = await dao.search({ id: String(id) });

  if (isExisted) {
    const whereJson = {
      id: id
    };

    const updateJson = {
      status: -1
    };

    // 删除的就不能在更新
    await dao.update(updateJson, whereJson);

    await dao.delete(id);

    return ctx.return(0, CODE.USER_DELETE_SUCCESS, null);
  } else {
    return ctx.return(-1, CODE.USER_NOT_EXIST, null);
  }
});

module.exports = router.routes();

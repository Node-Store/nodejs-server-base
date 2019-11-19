const router = require("koa-router")();

const CODE = require("../code");
const md5 = require("../../../utils/libs/md5");
const dao = require("../dao");

router.post("/", async function(ctx) {
  const post = ctx.request.body;

  const { phone, password, name } = post;

  const existedUser = await dao.search({ phone: phone }, false);

  let data = null;

  // Email is only one
  if (existedUser) {
    if (existedUser.delete_at) {
      return ctx.return(1, CODE.USER_DELETED, null);
    }
    return ctx.return(1, CODE.USER_EXIST, null);
  } else {
    data = await dao.add({
      phone,
      name,
      password: md5(password)
    });
  }

  return ctx.return(0, CODE.USER_CREATE_SUCCESS, data);
});

module.exports = router.routes();

const CODE = require("../code");

let router = require("koa-router")();

let md5 = require("../../../utils/libs/md5");

let dao = require("../dao");

router.post("/", async function(ctx, next) {
  let post = ctx.request.body;

  const { email, password, name } = post;

  const existedUser = await dao.search({ email });

  let data = null;

  // Email is only one
  if (existedUser) {
    return ctx.return(-1, CODE.USER_EXIST, data);
  } else {
    data = await dao.add({
      email,
      name,
      password: md5(password)
    });
  }

  return ctx.return(0, CODE.USER_CREATE_SUCCESS, data);
});

module.exports = router.routes();

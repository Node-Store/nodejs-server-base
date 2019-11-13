const router = require("koa-router")();

const md5 = require("../../../utils/libs/md5");
const CODE = require("../code");
const dao = require("../dao");
router.post("/", async function(ctx, next) {
  let post = ctx.request.body;

  let res_user = await dao.search({
    phone: post.phone
  });

  if (!res_user) {
    return ctx.return(-1, CODE.USER_NOT_EXIST, null);
  }

  const correct_pwd = res_user.password === md5(post.password);

  if (correct_pwd) {
    const data = {
      id: res_user.id,
      name: res_user.name,
      phone: res_user.phone
    };

    // ctx.session.user = data;

    return ctx.return(0, CODE.USER_LOGIN_SUCCESS, data);
  } else {
    // ctx.session.user = null;

    return ctx.return(-1, CODE.USER_PASSWORD_NOT_CORRECT, null);
  }
});

module.exports = router.routes();

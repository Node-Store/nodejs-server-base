const router = require("koa-router")();

const md5 = require("../../../utils/libs/md5");
const CODE = require("../code");
const dao = require("../dao");

router.post("/", async function(ctx, next) {
  let post = ctx.request.body;

  let res_user = await dao.searchLogin({
    phone: post.phone
  });

  if (!res_user) {
    return ctx.return(-1, CODE.USER_NOT_EXIST, null);
  }

  const correct_pwd = res_user.password === md5(post.password);

  // FIXME: COOKIES
  if (correct_pwd) {
    res_user.password = null;
    ctx.cookies.set("user_id", res_user.id, {
      domain: "localhost", // 写cookie所在的域名
      path: "/", // 写cookie所在的路径
      maxAge: 60 * 60 * 1000, // cookie有效时长
      expires: new Date("2200-02-15"), // cookie失效时间
      httpOnly: false, // 是否只用于http请求中获取
      overwrite: false // 是否允许重写
    });

    return ctx.return(0, CODE.USER_LOGIN_SUCCESS, res_user);
  } else {
    return ctx.return(1, CODE.USER_PASSWORD_NOT_CORRECT, null);
  }
});

module.exports = router.routes();

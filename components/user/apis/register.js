const router = require("koa-router")();
const CODE = require("../code");
const md5 = require("../../../utils/libs/md5");

let dao = require("../dao");

router.post("/", async function(ctx) {
  let post = ctx.request.body;

  const { phone, password, name } = post;

  const existedUser = await dao.search({ phone: phone }, false);

  if (existedUser) {
    return ctx.return(-1, CODE.USER_DELETED, null);
  }

  if (!phone || !password) {
    return ctx.return(-1, CODE.USER_NOT_VALID_QUERY, null);
  }

  const md5Pass = md5(password);

  const result = await dao.register({
    phone: phone,
    password: md5Pass,
    name: name
  });

  const [user, created] = result;

  // phone is only one
  if (created) {
    return ctx.return(0, CODE.USER_CREATE_SUCCESS, user);
  } else {
    return ctx.return(-1, CODE.USER_EXIST, null);
  }
});

module.exports = router.routes();

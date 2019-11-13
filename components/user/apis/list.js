const router = require("koa-router")();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const CODE = require("../code");
const dao = require("../dao");

router.get("/", async function(ctx, next) {
  let get = ctx.request.query;
  let page = get.page;
  let pageSize = get.size;

  const whereJson = {
    name: {
      [Op.like]: "%" + get.name + "%"
    }
  };

  const res = await dao.list(whereJson, +page, +pageSize);

  const data = res
    ? {
        count: res.count,
        data: res.rows,
        code: 0,
        page,
        pageSize
      }
    : null;

  if (data) {
    return ctx.return(0, CODE.USER_NORMAL_SUCCESS, data);
  } else {
    return ctx.return(-1, CODE.USER_NORMAL_FAILED, data);
  }
});

module.exports = router.routes();

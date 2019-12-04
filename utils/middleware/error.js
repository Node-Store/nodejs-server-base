const errorHandler = async function(ctx, next) {
  const clientIp =
    ctx.req.headers["x-forwarded-for"] ||
    ctx.req.connection.remoteAddress ||
    ctx.req.socket.remoteAddress ||
    ctx.req.connection.socket.remoteAddress;

  const get = ctx.request.query;
  const post = ctx.request.body;

  ctx.log("access_log", clientIp + "; " + ctx.request.url);

  try {
    await next();
  } catch (error) {
    ctx.log("500", clientIp + "; " + ctx.request.url + "; " + error.toString());

    ctx.status = 500;

    return ctx.return(500, error.toString(), null);
  }

  if (ctx.status == 404) {
    ctx.log("404", ip + "; " + ctx.request.url);

    return ctx.return(404, "Not Found :(", null);
  }
};

module.exports = errorHandler;

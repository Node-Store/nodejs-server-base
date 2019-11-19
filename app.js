const Koa = require("koa");
const Router = require("koa-router");
const cors = require("koa2-cors");
const xmlParser = require("koa-xml-body");
const bodyParser = require("koa-body");

// Instance
const app = new Koa();
const router = new Router();

// Port
const port = process.env.PORT || 8868;

// Router
const routes = require("./routes.js");

// Default return body, this is quick return function
app.context.return = function(code = 0, message = "", data = null) {
  return (this.body = {
    message,
    data,
    code
  });
};

// Proxy is true, can get IP address
app.proxy = true;

//Default context quick return function, can save into sql
app.context.log = function(key = "untitled log", value = "") {
  daoLog.add({
    key,
    value
  });
};

// File Upload Support
app.use(bodyParser({ multipart: true }));

// Xml Support
app.use(xmlParser());
app.use(function(ctx, next) {
  ctx.xml = ctx.request.body;
  return next();
});

// Cross origin Setting
app.use(
  cors({
    origin: function(ctx) {
      return "*"; // special domains
    },
    credentials: true,
    allowMethods: ["GET", "PUT", "POST", "PATCH", "DELETE", "HEAD", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"]
  })
);

// give router to routes, inside will use `use`
routes(router);

// register routes to app
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, "0.0.0.0");

console.log(
  "====  🎉 🔥 🎉 🔥 🎉 🔥  ====  Server is running at: " +
    `http://localhost:${port}`
);

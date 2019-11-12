const ENV = {
  dev: {
    mysql: {
      logging: true,
      databaseName: "test",
      username: "root",
      password: "1234567890",
      host: "127.0.0.1",
      port: 3306,
      baseUrl: "",
      forceUpdateModel: true
    },
    oss: {
      region: "",
      accessKeyId: "",
      accessKeySecret: "",
      bucket: ""
    },
    sms: {
      accessKeyId: "",
      secretAccessKey: "",
      TemplateCode: "",
      SignName: ""
    },
    redis: {
      port: 6379,
      host: "",
      family: 4,
      password: "",
      db: 1
    }
  },
  online: {
    mysql: {
      logging: false,
      databaseName: "",
      username: "",
      password: "",
      host: "",
      port: 3306,
      baseUrl: "",
      forceUpdateModel: false
    },
    oss: {
      region: "",
      accessKeyId: "",
      accessKeySecret: "",
      bucket: ""
    },
    sms: {
      accessKeyId: "",
      secretAccessKey: "",
      TemplateCode: "",
      SignName: ""
    },
    redis: {
      port: 6379,
      host: "",
      family: 4,
      password: "",
      db: 1
    }
  }
};

const PRODUCTION = process.env.NODE_ENV == "production";
let CONFIG = ENV.dev;

if (PRODUCTION) {
  CONFIG = ENV.online;
}

module.exports = CONFIG;

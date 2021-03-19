const ENV = process.env.NODE_ENV || "development";
const data = {
  test: "test",
  development: "development",
  production: "development",
};
module.exports = require(`./${data[ENV]}-data/index`);

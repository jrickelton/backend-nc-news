process.env.NODE_ENV = "test";
const {
  topicData,
  articleData,
  commentData,
  userData,
} = require("../data/index");

console.log(topicData);
exports.seed = function (knex) {
  // add seeding functionality here
};

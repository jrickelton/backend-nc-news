process.env.NODE_ENV = "test";
const {
  topicData,
  articleData,
  commentData,
  userData,
} = require("../data/index");

exports.seed = function (knex) {
  return knex
    .insert(topicData)
    .into("topics")
    .returning("*")
    .then((insertedTopics) => {
      return knex
        .insert(userData)
        .into("users")
        .returning("*")
        .then((insertedUsers) => {
          console.log(insertedUsers);
        });
    });
};

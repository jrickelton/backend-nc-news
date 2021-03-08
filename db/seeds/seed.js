process.env.NODE_ENV = "test";
const {
  topicData,
  articleData,
  commentData,
  userData,
} = require("../data/index");

const { formatTimestamp } = require("../utils/data-manipulation");

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
          const formattedArticleData = formatTimestamp(articleData);
          return knex
            .insert(formattedArticleData)
            .into("articles")
            .returning("*")
            .then((insertedArticles) => {
              console.log(insertedArticles);
            });
        });
    });
};

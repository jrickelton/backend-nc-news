const {
  topicData,
  articleData,
  commentData,
  userData,
} = require("../data/index");

const {
  formatTimestamp,
  renameKey,
  createRefObject,
  addKeyFromRefObject,
} = require("../utils/data-manipulation");

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex.insert(topicData).into("topics").returning("*");
    })
    .then(() => {
      return knex.insert(userData).into("users").returning("*");
    })
    .then(() => {
      const formattedArticleData = formatTimestamp(articleData);
      return knex.insert(formattedArticleData).into("articles").returning("*");
    })
    .then((insertedArticles) => {
      const articleNameAndIDRef = createRefObject(
        insertedArticles,
        "title",
        "article_id"
      );

      const formattedCommentsData = addKeyFromRefObject(
        renameKey(formatTimestamp(commentData), "created_by", "author"),
        articleNameAndIDRef,
        "belongs_to",
        "article_id"
      );

      return knex.insert(formattedCommentsData).into("comments").returning("*");
    })
    .catch((err) => {
      console.log(err);
    });
};

//format created_at timestamp
//change created_by to author
//make createRefObject func
//add article_id based on belongs_to

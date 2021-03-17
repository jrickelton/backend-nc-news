const { dbConnection } = require("../db/connection");
const { coerceObjValuesToNums } = require("../db/utils/data-manipulation");

const fetchAllArticles = ({ sort_by, order_by }) => {
  return dbConnection
    .select(
      "articles.title",
      "articles.article_id",
      "articles.body",
      "articles.topic",
      "articles.created_at",
      "articles.votes",
      "articles.author"
    )
    .count({ comment_count: "comment_id" })
    .count()
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by || "articles.created_at", order_by || "desc")
    .then((articles) => {
      return coerceObjValuesToNums(articles);
    });
};

const fetchArticleById = (article_id) => {
  if (isNaN(article_id)) {
    return Promise.reject({
      status: 400,
      msg: "Bad request",
    });
  } else
    return dbConnection
      .select(
        "articles.article_id",
        "articles.author",
        "articles.body",
        "articles.created_at",
        "articles.title",
        "articles.topic",
        "articles.votes"
      )
      .from("articles")
      .count({ comment_count: "comment_id" })
      .leftJoin("comments", "articles.article_id", "comments.article_id")
      .groupBy("articles.article_id")
      .where("articles.article_id", article_id)
      .then((article) => {
        if (!article.length)
          return Promise.reject({
            status: 404,
            msg: `No article found with article_id: ${article_id}`,
          });
        return article;
      });
};

const updateArticleVotes = (article_id, vote) => {
  if (!vote) {
    return Promise.reject({
      status: 400,
      msg: "Bad request",
    });
  } else if (isNaN(article_id)) {
    return Promise.reject({
      status: 400,
      msg: "Bad request",
    });
  } else
    return dbConnection
      .select("*")
      .from("articles")
      .where("articles.article_id", parseInt(article_id))
      .increment("votes", vote)
      .returning("*")
      .then(() => {
        return fetchArticleById(article_id);
      });
};

const checkArticleExists = (article_id) => {
  return dbConnection("articles")
    .where("article_id", parseInt(article_id))
    .returning("*")
    .then((data) => {
      if (!data.length) {
        return Promise.reject({
          status: 404,
          msg: `No article found with article_id: ${article_id}`,
        });
      } else return data;
    });
};

module.exports = {
  fetchAllArticles,
  fetchArticleById,
  updateArticleVotes,
  checkArticleExists,
};

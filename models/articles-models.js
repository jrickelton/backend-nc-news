const { dbConnection } = require("../db/connection");

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
      .then((data) => {
        return fetchArticleById(article_id);
      });
};

checkArticleExists = (article_id) => {
  return dbConnection
    .select("*")
    .from("articles")
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

module.exports = { fetchArticleById, updateArticleVotes, checkArticleExists };

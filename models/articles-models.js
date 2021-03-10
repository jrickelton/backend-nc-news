const { dbConnection } = require("../db/connection");

exports.fetchArticlesById = (article_id) => {
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

const { dbConnection } = require("../db/connection");

exports.writeCommentByArticleId = ({ article_id }, { username, body }) => {
  if (isNaN(article_id)) {
    return Promise.reject({
      status: 400,
      msg: "Bad request",
    });
  } else if (body === null) {
    return Promise.reject({
      status: 400,
      msg: "No comment body provided",
    });
  }
  return dbConnection
    .insert({
      author: username,
      article_id: article_id,
      created_at: new Date(Date.now()),
      body: body,
    })
    .into("comments")
    .returning("*")
    .then((commentData) => {
      return commentData;
    });
};

exports.fetchCommentsByArticleId = (article_id, { sort_by }) => {
  return dbConnection
    .select("*")
    .from("comments")
    .where("article_id", article_id)
    .orderBy(sort_by || "created_at", "desc")
    .returning("*")
    .then((commentsData) => {
      if (!commentsData.length) {
        return Promise.reject({
          status: 404,
          msg: `This article (article id: ${article_id}) currently has no comments`,
        });
      } else return commentsData;
    });
};

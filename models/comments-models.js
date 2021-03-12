const { dbConnection } = require("../db/connection");

writeCommentByArticleId = ({ article_id }, { username, body }) => {
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

module.exports = { writeCommentByArticleId };

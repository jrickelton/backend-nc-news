const { dbConnection } = require("../db/connection");

writeCommentByArticleId = ({ article_id }, { username, body }) => {
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

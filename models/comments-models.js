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
      body: body,
    })
    .into("comments")
    .returning("*")
    .then((commentData) => {
      return commentData;
    });
};

exports.fetchCommentsByArticleId = ({ article_id }, { sort_by, order_by }) => {
  return dbConnection
    .select("*")
    .from("comments")
    .where("article_id", article_id)
    .orderBy(sort_by || "created_at", order_by || "desc")
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

exports.updateCommentVotes = ({ comment_id }, { inc_votes }) => {
  if (isNaN(inc_votes)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  return dbConnection
    .select("*")
    .from("comments")
    .where("comments.comment_id", parseInt(comment_id))
    .increment("votes", inc_votes)
    .returning("*")
    .then((commentData) => {
      return commentData;
    });
};

exports.checkCommentExists = ({ comment_id }) => {
  return dbConnection("comments")
    .where("comment_id", parseInt(comment_id))
    .returning("*")
    .then((data) => {
      if (!data.length) {
        return Promise.reject({
          status: 404,
          msg: `No comment found with comment_id: ${comment_id}`,
        });
      } else return data;
    });
};

exports.removeCommentsById = ({ comment_id }) => {
  return dbConnection("comments").where("comment_id", comment_id).delete();
};

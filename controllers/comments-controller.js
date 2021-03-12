const {
  writeCommentByArticleId,
  fetchCommentsByArticleId,
} = require("../models/comments-models");
const { checkArticleExists } = require("../models/articles-models");
const { checkUsernameExists } = require("../models/users-models");

exports.postCommentByArticleId = (req, res, next) => {
  Promise.all([
    checkArticleExists(req.params.article_id),
    checkUsernameExists(req.body.username),
    writeCommentByArticleId(req.params, req.body),
  ])
    .then((data) => {
      res.status(200).send({ comment: data[2] });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticleCommentsByArticleId = (req, res, next) => {
  fetchCommentsByArticleId(req.params.article_id)
    .then((commentsData) => {
      res.send({ comments: commentsData }).status(200);
    })
    .catch((err) => {
      next(err);
    });
};

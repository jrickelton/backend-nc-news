const {
  writeCommentByArticleId,
  fetchCommentsByArticleId,
  removeCommentsById,
} = require("../models/comments-models");
const { checkArticleExists } = require("../models/articles-models");
const { checkUsernameExists } = require("../models/users-models");
const {
  updateCommentVotes,
  checkCommentExists,
} = require("../models/comments-models");

exports.postCommentByArticleId = (req, res, next) => {
  Promise.all([
    checkArticleExists(req.params),
    checkUsernameExists(req.body),
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
  return Promise.all([
    checkArticleExists(req.params),
    fetchCommentsByArticleId(req.params, req.query),
  ])

    .then((data) => {
      res.send({ comments: data[1] }).status(200);
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchCommentsById = (req, res, next) => {
  return Promise.all([
    checkCommentExists(req.params),
    updateCommentVotes(req.params, req.body),
  ])
    .then((data) => {
      res.status(200).send({ comment: data[1] });
    })
    .catch(next);
};

exports.deleteCommentsById = (req, res, next) => {
  return Promise.all([
    checkCommentExists(req.params),
    removeCommentsById(req.params),
  ])
    .then((data) => {
      res.sendStatus(201);
    })
    .catch(next);
};

const { writeCommentByArticleId } = require("../models/comments-models");
const { checkArticleExists } = require("../models/articles-models");
const { checkUsernameExists } = require("../models/users-models");

exports.postCommentByArticleId = (req, res, next) => {
  Promise.all([
    checkArticleExists(req.params),
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

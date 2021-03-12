const { writeCommentByArticleId } = require("../models/comments-models");
const { checkArticleExists } = require("../models/articles-models");

exports.postCommentByArticleId = (req, res, next) => {
  Promise.all([
    writeCommentByArticleId(req.params, req.body),
    checkArticleExists(req.params),
  ])
    .then((data) => {
      res.status(200).send({ comment: data[0] });
    })
    .catch(next);
};

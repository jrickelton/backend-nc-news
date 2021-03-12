const {
  fetchArticleById,
  updateArticleVotes,
  checkArticleExists,
} = require("../models/articles-models");

exports.getArticleById = (req, res, next) => {
  return fetchArticleById(req.params.article_id)
    .then((articleData) => {
      res.status(200).send({ article: articleData });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  Promise.all([
    checkArticleExists(req.params.article_id),
    updateArticleVotes(req.params.article_id, req.body.inc_votes),
  ])
    .then((data) => {
      res.status(200).send({ article: data[1] });
    })
    .catch(next);
};

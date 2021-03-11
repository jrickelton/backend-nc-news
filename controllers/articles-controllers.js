const {
  fetchArticleById,
  updateArticleVotes,
} = require("../models/articles-models");

exports.getArticleById = (req, res, next) => {
  return fetchArticleById(req.params.article_id)
    .then((articleData) => {
      res.status(200).send({ article: articleData });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  return updateArticleVotes(req.params.article_id, req.body.inc_votes)
    .then((articleData) => {
      res.status(200).send({ article: articleData });
    })
    .catch(next);
};

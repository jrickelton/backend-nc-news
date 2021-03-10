const { fetchArticlesById } = require("../models/articles-models");

exports.getArticleById = (req, res, next) => {
  return fetchArticlesById(req.params.article_id)
    .then((articleData) => {
      res.status(200).send({ article: articleData });
    })
    .catch(next);
};

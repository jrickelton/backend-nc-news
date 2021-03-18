const {
  fetchAllArticles,
  fetchArticleById,
  updateArticleVotes,
  checkArticleExists,
} = require("../models/articles-models");
const { checkTopicExists } = require("../models/topics-models");
const { checkUsernameExists } = require("../models/users-models");

exports.getArticleById = (req, res, next) => {
  return fetchArticleById(req.params.article_id)
    .then((articleData) => {
      res.status(200).send({ article: articleData });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  return Promise.all([
    checkArticleExists(req.params.article_id),
    updateArticleVotes(req.params.article_id, req.body.inc_votes),
  ])
    .then((data) => {
      res.status(200).send({ article: data[1] });
    })
    .catch(next);
};

exports.getAllArticles = (req, res, next) => {
  const promiseArray = [
    checkUsernameExists(req.query.author),
    checkTopicExists(req.query),
    fetchAllArticles(req.query),
  ];
  return Promise.all(promiseArray)
    .then((data) => {
      res.status(200).send({ articles: data[2] });
    })
    .catch(next);
};

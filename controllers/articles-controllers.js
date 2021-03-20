const {
  fetchAllArticles,
  fetchArticleById,
  updateArticleVotes,
  checkArticleExists,
} = require("../models/articles-models");
const { checkTopicExists } = require("../models/topics-models");
const { checkUsernameExists } = require("../models/users-models");

exports.getArticleById = (req, res, next) => {
  return fetchArticleById(req.params)
    .then((articleData) => {
      res.status(200).send({ article: articleData });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  return Promise.all([
    checkArticleExists(req.params),
    updateArticleVotes(req.params, req.body),
  ])
    .then((data) => {
      res.status(200).send({ article: data[1] });
    })
    .catch(next);
};

exports.getAllArticles = (req, res, next) => {
  const promiseArray = [
    checkUsernameExists(req.query),
    checkTopicExists(req.query),
    fetchAllArticles(req.query),
  ];
  return Promise.all(promiseArray)
    .then((data) => {
      res.status(200).send({ articles: data[2] });
    })
    .catch(next);
};

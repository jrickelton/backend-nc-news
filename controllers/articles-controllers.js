const {
  fetchAllArticles,
  fetchArticleById,
  updateArticleVotes,
  checkArticleExists,
} = require("../models/articles-models");
const { checkTopicExists } = require("../models/topics-models");
const { checkUsernameExists } = require("../models/users-models");

// exports.getAllArticles = (req, res, next) => {
//   if (req.query.author) {
//     Promise.all([
//       checkUsernameExists(req.query.author),
//       fetchAllArticles(req.query),
//     ])
//       .then((data) => {
//         res.status(200).send({ articles: data[1] });
//       })
//       .catch(next);
//   } else if (req.query.topic) {
//     Promise.all([checkTopicExists(req.query), fetchAllArticles(req.query)])
//       .then((data) => {
//         res.status(200).send({ articles: data[1] });
//       })
//       .catch(next);
//   } else if (req.query.author && req.query.topic) {
//     Promise.all([
//       checkUsernameExists(req.query.author),
//       checkTopicExists(req.query),
//       fetchAllArticles(req.query),
//     ])
//       .then((data) => {
//         res.status(200).send({ articles: data[2] });
//       })
//       .catch(next);
//   } else {
//     return fetchAllArticles(req.query)
//       .then((articles) => {
//         res.status(200).send({ articles });
//       })
//       .catch(next);
//   }
// };

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

exports.getAllArticles = (req, res, next) => {
  const promiseArray = [
    checkUsernameExists(req.query.author),
    checkTopicExists(req.query),
    fetchAllArticles(req.query),
  ];
  Promise.all(promiseArray)
    .then((data) => {
      res.status(200).send({ articles: data[2] });
    })
    .catch(next);
};

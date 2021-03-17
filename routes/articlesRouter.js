const articlesRouter = require("express").Router();
const {
  getAllArticles,
  getArticleById,
  patchArticleById,
} = require("../controllers/articles-controllers");

const {
  postCommentByArticleId,
  getArticleCommentsByArticleId,
} = require("../controllers/comments-controller");

articlesRouter.route("/").get(getAllArticles);

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById);

articlesRouter
  .route("/:article_id/comments")
  .get(getArticleCommentsByArticleId)
  .post(postCommentByArticleId);

module.exports = { articlesRouter };

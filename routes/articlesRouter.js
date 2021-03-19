const articlesRouter = require("express").Router();
const {
  getAllArticles,
  getArticleById,
  patchArticleById,
} = require("../controllers/articles-controllers");
const { handle405s } = require("../error-handlers");

const {
  postCommentByArticleId,
  getArticleCommentsByArticleId,
} = require("../controllers/comments-controller");

articlesRouter.route("/").get(getAllArticles).all(handle405s);

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById)
  .all(handle405s);

articlesRouter
  .route("/:article_id/comments")
  .get(getArticleCommentsByArticleId)
  .post(postCommentByArticleId)
  .all(handle405s);

module.exports = { articlesRouter };

const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchArticleById,
} = require("../controllers/articles-controllers");

const {
  postCommentByArticleId,
} = require("../controllers/comments-controller");

articlesRouter.get("/:article_id", getArticleById);
articlesRouter.patch("/:article_id", patchArticleById);
articlesRouter.post("/:article_id/comments", postCommentByArticleId);

module.exports = { articlesRouter };

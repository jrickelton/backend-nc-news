const articlesRouter = require("express").Router();
const { commentsRouter } = require("./commentsRouter");
const {
  getArticleById,
  patchArticleById,
} = require("../controllers/articles-controllers");

articlesRouter.get("/:article_id", getArticleById);
articlesRouter.patch("/:article_id", patchArticleById);
articlesRouter.use("/:article_id/comments", commentsRouter);

module.exports = { articlesRouter };

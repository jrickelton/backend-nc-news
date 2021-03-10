const articlesRouter = require("express").Router();
const { getArticleById } = require("../controllers/articles-controllers");

articlesRouter.use("/:article_id", getArticleById);

module.exports = { articlesRouter };

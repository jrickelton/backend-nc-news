const apiRouter = require("express").Router();

const { topicsRouter } = require("./topicsRouter");
const { usersRouter } = require("./usersRouter");
const { articlesRouter } = require("./articlesRouter");
const { commentsRouter } = require("./commentsRouter");

const { getEndpoints } = require("../controllers/api-controllers");
const { handle405s } = require("../error-handlers");

apiRouter.route("/").get(getEndpoints).all(handle405s);

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = { apiRouter };

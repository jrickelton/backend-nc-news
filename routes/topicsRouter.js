const topicsRouter = require("express").Router();
const { getTopics } = require("../controllers/topics-controllers");
const { handle405s } = require("../error-handlers");

topicsRouter.route("/").get(getTopics);

module.exports = { topicsRouter };

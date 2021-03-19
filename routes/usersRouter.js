const usersRouter = require("express").Router();
const { getUserByUsername } = require("../controllers/users-controllers");
const { handle405s } = require("../error-handlers");

usersRouter.route("/:username").get(getUserByUsername).all(handle405s);

module.exports = { usersRouter };

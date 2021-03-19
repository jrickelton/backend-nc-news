const commentsRouter = require("express").Router();
const {
  patchCommentsById,
  deleteCommentsById,
} = require("../controllers/comments-controller");
const { handle405s } = require("../error-handlers");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentsById)
  .delete(deleteCommentsById)
  .all(handle405s);

module.exports = { commentsRouter };

const commentsRouter = require("express").Router();
const {
  patchCommentsById,
  deleteCommentsById,
} = require("../controllers/comments-controller");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentsById)
  .delete(deleteCommentsById);

module.exports = { commentsRouter };

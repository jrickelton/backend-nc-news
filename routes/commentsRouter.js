const commentsRouter = require("express").Router();
commentsRouter.post("/", () => {
  console.log("yup");
});
module.exports = { commentsRouter };

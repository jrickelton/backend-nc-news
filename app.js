const express = require("express");
const app = express();
const { apiRouter } = require("./routes/apiRouter");
const {
  handle400s,
  handle404s,
  handle405s,
  handle500s,
} = require("./error-handlers");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

app.use(handle404s);
app.use(handle400s);
app.use(handle500s);

module.exports = app;

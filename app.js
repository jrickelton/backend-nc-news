const express = require("express");
const app = express();
const { apiRouter } = require("./routes/apiRouter");
const { handle400s, handle404s, handle500s } = require("./error-handlers");

app.use("/api", apiRouter);

app.use("/", handle404s); //can't get app.all to work?
app.use("/", handle400s);
app.use("/", handle500s);

module.exports = app;

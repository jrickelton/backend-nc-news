exports.handle400s = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ err: { status: 400, msg: "Bad request" } });
  } else next(err);
};
exports.handle404s = (err, req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({
      err: {
        status: 404,
        msg: "Not found",
      },
    });
  } else if (err.status === 404) {
    res.status(404).send({ err });
  } else next(err);
};

exports.handle500s = (err, req, res, next) => {
  console.log(err, "<---- unhandled error?");
  res.status(500).send("Internal server error");
};

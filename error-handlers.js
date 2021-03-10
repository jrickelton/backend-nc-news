exports.handle404s = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ error: { message: err.msg, status: err.status } });
  } else next(err);
};

exports.handle500s = (err, req, res, next) => {
  console.log(err, "<---- unhandled error?");
  res.status(500).send("Internal server error");
};

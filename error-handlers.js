exports.handle400s = (err, req, res, next) => {
  if (err.code === "42703" || err.status === 400) {
    res.status(400).send({ 400: err });
  } else next(err);
};
exports.handle404s = (err, req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({
      404: err,
    });
  } else if (err.status === 404) {
    res.status(404).send({ 404: err });
  } else next(err);
};

exports.handle500s = (err, req, res, next) => {
  console.log(err, "<---- unhandled error?");
  res.status(500).send({ 500: err });
};

exports.handle400s = (err, req, res, next) => {
  if (err.code === "42703" || err.code === "22P02" || err.status === 400) {
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

exports.handle405s = (req, res, next) => {
  res.status(405).send({ 405: { status: 405, msg: "Method not allowed" } });
};

exports.handle500s = (err, req, res, next) => {
  console.log(err, "<---- unhandled error?");
  res.status(500).send({ 500: err });
};

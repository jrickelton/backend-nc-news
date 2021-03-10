const { fetchUser } = require("../models/users-models");

exports.getUser = (req, res, next) => {
  return fetchUser(req.params.username)
    .then((userData) => {
      res.status(200).send({ user: userData });
    })
    .catch(next);
};

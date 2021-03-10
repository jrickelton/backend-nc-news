const { fetchUserByUsername } = require("../models/users-models");

exports.getUserByUsername = (req, res, next) => {
  return fetchUserByUsername(req.params.username)
    .then((userData) => {
      res.status(200).send({ user: userData });
    })
    .catch(next);
};

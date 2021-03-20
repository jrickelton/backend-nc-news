const { dbConnection } = require("../db/connection");

exports.fetchUserByUsername = ({ username }) => {
  return dbConnection
    .select("*")
    .from("users")
    .where("username", username)
    .then((userData) => {
      if (!userData.length) {
        return Promise.reject({
          status: 404,
          msg: `No user found with username: ${username}`,
        });
      } else {
        return userData;
      }
    });
};

exports.checkUsernameExists = ({ author }) => {
  if (!author) return Promise.resolve();
  else
    return dbConnection
      .select("*")
      .from("users")
      .where("username", author)
      .then((userData) => {
        if (!userData.length)
          return Promise.reject({
            status: 404,
            msg: `No user found with username: ${author}`,
          });
      });
};

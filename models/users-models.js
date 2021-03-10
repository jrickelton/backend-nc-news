const { dbConnection } = require("../db/connection");

exports.fetchUserByUsername = (username) => {
  return dbConnection
    .select("*")
    .from("users")
    .where("username", username)
    .then((userData) => {
      if (!userData.length)
        return Promise.reject({
          status: 404,
          msg: `No user found with username: ${username}`,
        });
      return userData;
    });
};

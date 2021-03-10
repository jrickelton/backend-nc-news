const { dbConnection } = require("../db/connection");

exports.fetchTopics = () => {
  return dbConnection
    .select("slug", "description")
    .from("topics")
    .then((topics) => {
      return { topics };
    });
};

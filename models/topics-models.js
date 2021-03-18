const { dbConnection } = require("../db/connection");

exports.fetchTopics = () => {
  return dbConnection
    .select("slug", "description")
    .from("topics")
    .then((topics) => {
      return { topics };
    });
};

exports.checkTopicExists = ({ topic }) => {
  if (!topic) return Promise.resolve();
  else
    return dbConnection("topics")
      .where("slug", topic)
      .returning("*")
      .then((data) => {
        if (!data.length) {
          return Promise.reject({
            status: 404,
            msg: `No topic found named: ${topic}`,
          });
        } else return data;
      });
};

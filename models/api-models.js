const fs = require("fs");
const test = require("../endpoints.json");

exports.fetchEndpoints = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("endpoints.json", "utf8", (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
};

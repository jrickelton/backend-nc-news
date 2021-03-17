const dbConnection = require("knex");
const dbConfig = require("../knexfile");

exports.dbConnection = dbConnection(dbConfig);

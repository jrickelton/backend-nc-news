const dbConnection = require("knex");
const dbConfig =
  ENV === "production"
    ? {
        client: "pg",
        connection: {
          connectionString: process.env.DATABASE_URL,
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }
    : require("../knexfile");

exports.dbConnection = dbConnection(dbConfig);

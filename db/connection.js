const dbConnection = require("knex");
const ENV = process.env.NODE_ENV || "development";
console.log(ENV);
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

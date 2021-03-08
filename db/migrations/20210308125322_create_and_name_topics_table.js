const topics = require("../data/test-data/topics");

exports.up = function (knex) {
  console.log("creating topics table...");
  return knex.schema.createTable("topics", (topicsTable) => {
    topicsTable.string("slug").primary().notNullable();
    topicsTable.string("description").notNullable();
  });
};

exports.down = function (knex) {
  console.log("removing topics table...");
  return knex.schema.dropTable("topics");
};

const comments = require("../data/test-data/comments");

exports.up = function (knex) {
  console.log("creating comments table...");
  return knex.schema.createTable("comments", (commentsTable) => {
    commentsTable.increments("comment_id").primary();
    commentsTable.string("author").references("users.username").notNullable;
    commentsTable
      .integer("article_id")
      .references("articles.article_id")
      .notNullable();
    commentsTable.integer("votes").defaultTo(0);
    commentsTable.timestamp("created_at");
    commentsTable.string("body");
  });
};

exports.down = function (knex) {
  console.log("removing comments table...");
  return knex.schema.dropTable("comments");
};

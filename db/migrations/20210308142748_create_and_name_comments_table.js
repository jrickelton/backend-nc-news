const comments = require("../data/test-data/comments");

exports.up = function (knex) {
  return knex.schema.createTable("comments", (commentsTable) => {
    commentsTable.increments("comment_id").primary();
    commentsTable.string("author").references("users.username").notNullable();
    commentsTable
      .integer("article_id")
      .references("articles.article_id")
      .notNullable();
    commentsTable.integer("votes").defaultTo(0).notNullable();
    commentsTable
      .timestamp("created_at")
      .defaultTo(knex.fn.now())
      .notNullable();
    commentsTable.text("body").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("comments");
};

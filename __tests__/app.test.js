const app = require("../app");
const { dbConnection } = require("../db/connection");
const request = require("supertest");

beforeEach(() => {
  return dbConnection.seed.run();
});
afterAll(() => {
  return dbConnection.destroy();
});

describe("/api", () => {
  describe("/topics", () => {
    test(":) GET /api/topics -> status: 200, and array of topics objects", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body: { topics } }) => {
          expect(Array.isArray(topics)).toBe(true);
          expect(topics.length).toBe(3);
          topics.forEach((topic) => {
            expect(topic).toMatchObject({
              slug: expect.any(String),
              description: expect.any(String),
            });
          });
        });
    });
  });
  describe("/users", () => {
    describe("/:username", () => {
      test(":) GET /api/users/butter_bridge -> status: 200, and user object corresponding to parametric endpoint when user is found", () => {
        return request(app)
          .get("/api/users/butter_bridge")
          .expect(200)
          .then(({ body }) => {
            expect(body).toMatchObject({
              user: [
                {
                  username: "butter_bridge",
                  avatar_url:
                    "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
                  name: "jonny",
                },
              ],
            });
          });
      });
      test(":( GET /api/users/not_a_username -> status: 404, msg: 'No user found with username: not_a_username' when username is not found", () => {
        return request(app)
          .get("/api/users/not_a_username")
          .expect(404)
          .then(({ body }) => {
            expect(body.err).toMatchObject({
              status: 404,
              msg: "No user found with username: not_a_username",
            });
          });
      });
    });
  });
  describe("/articles", () => {
    describe(":article_id", () => {
      test(":) GET /api/articles/1 -> status: 200, and article object corresponding to parametric endpoint when article is found", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then(({ body }) => {
            expect(body).toMatchObject({
              article: [
                {
                  author: "butter_bridge",
                  title: "Living in the shadow of a great man",
                  article_id: 1,
                  body: "I find this existence challenging",
                  topic: "mitch",
                  created_at: "2018-11-15T12:21:54.171Z",
                  votes: 100,
                  comment_count: "13",
                },
              ],
            });
          });
      });
      test(":( GET /api/articles/999 -> status: 404, msg: 'No article found with article_id: 999' when article cannot be found", () => {
        return request(app)
          .get("/api/articles/999")
          .expect(404)
          .then(({ body }) => {
            expect(body.err).toMatchObject({
              status: 404,
              msg: "No article found with article_id: 999",
            });
          });
      });
      test(":( GET /api/articles/not_an_article_id -> status: 400, msg: 'Bad request'", () => {
        return request(app)
          .get("/api/articles/not_an_article_id")
          .expect(400)
          .then(({ body }) => {
            expect(body.err).toMatchObject({
              status: 400,
              msg: "Bad request",
            });
          });
      });
    });
  });
});

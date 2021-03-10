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
      test(":( GET /api/users/not_a_username -> status: 404, message: 'No user found with username: not_a_username' when username is not found", () => {
        return request(app)
          .get("/api/users/not_a_username")
          .expect(404)
          .then((res) => {
            expect(res.body.error.message).toBe(
              "No user found with username: not_a_username"
            );
          });
      });
    });
  });
});

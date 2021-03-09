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
    test("GET -> status: 200, and sends topics array", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(Array.isArray(body)).toBe(true);
          expect(body[0]).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
    });
  });
});

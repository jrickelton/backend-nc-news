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
    describe("GET", () => {
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
  });
  describe("/users", () => {
    describe("/:username", () => {
      describe("GET", () => {
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
        test(":( GET /api/users/not_a_username -> 404: errObj when username is not found", () => {
          return request(app)
            .get("/api/users/not_a_username")
            .expect(404)
            .then(({ body }) => {
              expect(body).toMatchObject({
                404: expect.any(Object),
              });
            });
        });
      });
    });
  });
  describe("/articles", () => {
    describe("GET", () => {
      test(":) GET /api/articles -> status: 200, and responds with array of article objects, sorted by the created_at property", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).toHaveLength(12);
            expect(body.articles[8]).toMatchObject({
              title: "They're not exactly dogs, are they?",
              article_id: 9,
              body: "Well? Think about it.",
              topic: "mitch",
              created_at: "1986-11-23T12:21:54.171Z",
              votes: 0,
              author: "butter_bridge",
              comment_count: 2,
            });
            expect(body.articles).toBeSortedBy("created_at", {
              descending: true,
            });
            body.articles.forEach((article) => {
              expect(article).toMatchObject({
                title: expect.any(String),
                article_id: expect.any(Number),
                topic: expect.any(String),
                created_at: expect.any(String),
                author: expect.any(String),
                votes: expect.any(Number),
                comment_count: expect.any(Number),
              });
            });
          });
      });
      describe("?sort_by=", () => {
        test(":) GET /api/articles?sort_by=title -> status: 200 and responds with array of article objects sorted by title (desc by default)", () => {
          return request(app)
            .get("/api/articles?sort_by=title")
            .expect(200)
            .then(({ body }) => {
              expect(body.articles).toHaveLength(12);
              expect(body.articles).toBeSortedBy("title", { descending: true });
            });
        });
        test(":( GET /api/articles?sort_by=not_a_column -> 400: errObj", () => {
          return request(app)
            .get("/api/articles?sort_by=not_a_column")
            .expect(400)
            .then(({ body }) => {
              expect(body).toMatchObject({ 400: expect.any(Object) });
            });
        });
        describe("&order_by=", () => {
          test(":) GET /api/articles?sort_by=title&order_by=asc -> status: 200 and responds with array of article objects sorted by title in ascending order", () => {
            return request(app)
              .get("/api/articles?sort_by=title&order_by=asc")
              .expect(200)
              .then(({ body }) => {
                expect(body.articles).toHaveLength(12);
                expect(body.articles).toBeSortedBy("title", {
                  ascending: true,
                });
              });
          });
        });
      });
    });
    describe(":article_id", () => {
      describe("GET", () => {
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
        test(":( GET /api/articles/999 -> 404: errObj", () => {
          return request(app)
            .get("/api/articles/999")
            .expect(404)
            .then(({ body }) => {
              expect(body).toMatchObject({ 404: expect.any(Object) });
            });
        });
        test(":( GET /api/articles/not_an_article_id -> 400: errObj", () => {
          return request(app)
            .get("/api/articles/not_an_article_id")
            .expect(400)
            .then(({ body }) => {
              expect(body).toMatchObject({ 400: expect.any(Object) });
            });
        });
      });
      describe("PATCH", () => {
        test(":) PATCH /api/articles/1 with { inc_votes: newVote } -> status: 200 and article data with votes increased or decreased by newVote value when valid vote object { inc_votes: 1 } posted", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: 1 })
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
                    votes: 101,
                    comment_count: "13",
                  },
                ],
              });
            });
        });
        test(":( PATCH /api/articles/999 -> 404: errObj when article cannot be found", () => {
          return request(app)
            .patch("/api/articles/999")
            .send({ inc_votes: 1 })
            .expect(404)
            .then(({ body }) => {
              expect(body).toMatchObject({
                404: expect.any(Object),
              });
            });
        });
        test(":( PATCH /api/articles/not_an_article_id -> 400: errObj", () => {
          return request(app)
            .patch("/api/articles/not_an_article_id")
            .send({ inc_votes: 1 })
            .expect(400)
            .then(({ body }) => {
              expect(body).toMatchObject({
                400: expect.any(Object),
              });
            });
        });

        test(":( PATCH /api/articles/1 with { incorrect_property: newVote } -> 400: errObj", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ incorrect_property: 1 })
            .expect(400)
            .then(({ body }) => {
              expect(body).toMatchObject({
                400: expect.any(Object),
              });
            });
        });
      });
      describe("/comments", () => {
        describe("GET", () => {
          test(":) GET /api/articles/1/comments -> status: 200 and array of comments for the given article id, sorted by created_at by default", () => {
            return request(app)
              .get("/api/articles/1/comments")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).toHaveLength(13);
                expect(body.comments[0]).toMatchObject({
                  comment_id: expect.any(Number),
                  votes: expect.any(Number),
                  created_at: expect.any(String),
                  author: expect.any(String),
                  body: expect.any(String),
                });
                expect(body.comments).toBeSortedBy("created_at", {
                  descending: true,
                  coerce: true,
                });
              });
          });
          test(":( GET /api/articles/2/comments -> 404: errObj for a valid article with no comments", () => {
            return request(app)
              .get("/api/articles/2/comments")
              .expect(404)
              .then(({ body }) => {
                expect(body).toMatchObject({ 404: expect.any(Object) });
              });
          });
          test(":( GET /api/articles/999/comments -> 404: errObj when valid but non-existent article_id is requested", () => {
            return request(app)
              .get("/api/articles/999/comments")
              .expect(404)
              .then(({ body }) => {
                expect(body).toMatchObject({
                  404: expect.any(Object),
                });
              });
          });
          test(":( GET /api/articles/not_a_number/comments -> 400: errObj", () => {
            return request(app)
              .get("/api/articles/not_a_number")
              .expect(400)
              .then(({ body }) => {
                expect(body).toMatchObject({
                  400: expect.any(Object),
                });
              });
          });
          describe("?sort_by=", () => {
            test(":) GET /api/articles/1/comments?sort_by=author -> status: 200, returns array of comments for the given article sorted by author (defaults to descending)", () => {
              return request(app)
                .get("/api/articles/1/comments?sort_by=author")
                .expect(200)
                .then(({ body }) => {
                  expect(body.comments).toHaveLength(13);
                  expect(body.comments).toBeSortedBy("author", {
                    descending: true,
                  });
                });
            });
            test(":( GET /api/articles/1/comments?sort_by=not_a_column -> 400: errObj", () => {
              return request(app)
                .get("/api/articles/1/comments?sort_by=not_a_column")
                .expect(400)
                .then(({ body }) => {
                  expect(body).toMatchObject({
                    400: expect.any(Object),
                  });
                });
            });
            describe("&order_by=asc", () => {
              test(":) GET /api/articles/1/comments?sort_by=author&order_by=asc -> status: 200, returns array of comments for the given article sorted by author ascending", () => {
                return request(app)
                  .get("/api/articles/1/comments?sort_by=author&order_by=asc")
                  .expect(200)
                  .then(({ body }) => {
                    expect(body.comments).toHaveLength(13);
                    expect(body.comments).toBeSortedBy("author");
                  });
              });
            });
          });
        });
        describe("POST", () => {
          test(':) POST /api/articles/1/comments -> status: 200, and new comment object when valid new comment object { username: "butter_bridge" body: "test comment" } posted. Also expect "comments" table to be updated', () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({ username: "butter_bridge", body: "test comment" })
              .expect(200)
              .then(({ body }) => {
                expect(body.comment[0]).toMatchObject({
                  comment_id: 19,
                  author: "butter_bridge",
                  article_id: 1,
                  votes: 0,
                  body: "test comment",
                });
                expect(new Date(body.comment[0].created_at)).toEqual(
                  expect.any(Date)
                );
              })
              .then(() => {
                return dbConnection
                  .select("*")
                  .from("comments")
                  .then((data) => {
                    expect(data.length).toBe(19);
                  });
              });
          });

          test(":( POST /api/articles/999 -> 404: errObj", () => {
            return request(app)
              .post("/api/articles/999/comments")
              .send({ username: "butter_bridge", body: "test comment" })
              .expect(404)
              .then(({ body }) => {
                expect(body).toMatchObject({
                  404: expect.any(Object),
                });
              });
          });
          test(":( POST /api/articles/not_an_article_id/comments -> 400: errObj", () => {
            return request(app)
              .post("/api/articles/not_an_article_id/comments")
              .send({ username: "butter_bridge", body: "test comment" })
              .expect(400)
              .then(({ body }) => {
                expect(body).toMatchObject({
                  400: expect.any(Object),
                });
              });
          });
          test(":( POST /api/articles/1/comments -> 404: errObj when object with invalid username posted", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({ username: "not_a_valid_username", body: "test comment" })
              .expect(404)
              .then(({ body }) => {
                expect(body).toMatchObject({
                  404: expect.any(Object),
                });
              });
          });
          test(":( POST /api/articles/1/comments -> 400: errObj when posted object body is null", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({ username: "butter_bridge", body: null })
              .expect(400)
              .then(({ body }) => {
                expect(body).toMatchObject({
                  400: expect.any(Object),
                });
              });
          });
        });
      });
    });
  });
});

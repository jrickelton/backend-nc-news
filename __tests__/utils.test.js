const { formatTimestamp } = require("../db/utils/data-manipulation");

describe("formatTimestamp", () => {
  test("should return an empty object when called with an empty object", () => {
    expect(formatTimestamp([{}])).toEqual([{}]);
  });
  test("should return an identical object when called on an object without a created_at property", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        votes: 100,
      },
    ];
    expect(formatTimestamp(input)).toEqual([
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        votes: 100,
      },
    ]);
  });
  test("should re-format a unix timestamp in the created_at property in a single object", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
      },
    ];
    const expected = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: "2018-11-15T12:21:54.171Z",
        votes: 100,
      },
    ];
    expect(formatTimestamp(input)).toEqual(expected);
  });
  test("should return a new array", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
      },
    ];
    expect(formatTimestamp(input)).not.toBe(input);
  });
  test("should work on an array of several objects", () => {
    const input = [
      {
        title: "UNCOVERED: catspiracy to bring down democracy",
        topic: "cats",
        author: "rogersop",
        body: "Bastet walks amongst us, and the cats are taking arms!",
        created_at: 1037708514171,
      },
      {
        title: "A",
        topic: "mitch",
        author: "icellusedkars",
        body: "Delicious tin of cat food",
        created_at: 911564514171,
      },
      {
        title: "Z",
        topic: "mitch",
        author: "icellusedkars",
        body: "I was hungry.",
        created_at: 785420514171,
      },
    ];
    const expected = [
      {
        title: "UNCOVERED: catspiracy to bring down democracy",
        topic: "cats",
        author: "rogersop",
        body: "Bastet walks amongst us, and the cats are taking arms!",
        created_at: "2002-11-19T12:21:54.171Z",
      },
      {
        title: "A",
        topic: "mitch",
        author: "icellusedkars",
        body: "Delicious tin of cat food",
        created_at: "1998-11-20T12:21:54.171Z",
      },
      {
        title: "Z",
        topic: "mitch",
        author: "icellusedkars",
        body: "I was hungry.",
        created_at: "1994-11-21T12:21:54.171Z",
      },
    ];
    expect(formatTimestamp(input)).toEqual(expected);
  });
  test("should not mutate original array or objects within", () => {
    const input = [
      {
        title: "UNCOVERED: catspiracy to bring down democracy",
        topic: "cats",
        author: "rogersop",
        body: "Bastet walks amongst us, and the cats are taking arms!",
        created_at: 1037708514171,
      },
      {
        title: "A",
        topic: "mitch",
        author: "icellusedkars",
        body: "Delicious tin of cat food",
        created_at: 911564514171,
      },
      {
        title: "Z",
        topic: "mitch",
        author: "icellusedkars",
        body: "I was hungry.",
        created_at: 785420514171,
      },
    ];
    const output = formatTimestamp(input);
    expect(input).toEqual([
      {
        title: "UNCOVERED: catspiracy to bring down democracy",
        topic: "cats",
        author: "rogersop",
        body: "Bastet walks amongst us, and the cats are taking arms!",
        created_at: 1037708514171,
      },
      {
        title: "A",
        topic: "mitch",
        author: "icellusedkars",
        body: "Delicious tin of cat food",
        created_at: 911564514171,
      },
      {
        title: "Z",
        topic: "mitch",
        author: "icellusedkars",
        body: "I was hungry.",
        created_at: 785420514171,
      },
    ]);
    expect(input[0]).toEqual({
      title: "UNCOVERED: catspiracy to bring down democracy",
      topic: "cats",
      author: "rogersop",
      body: "Bastet walks amongst us, and the cats are taking arms!",
      created_at: 1037708514171,
    });
    expect(output[0]).not.toBe(input[0]);
  });
});

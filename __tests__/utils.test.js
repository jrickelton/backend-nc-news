const {
  formatTimestamp,
  renameKey,
  createRefObject,
  addKeyFromRefObject,
  coerceObjValuesToNums,
} = require("../db/utils/data-manipulation");

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
        created_at: 1542284514171,
      },
    ];
    const expected = [
      {
        created_at: "2018-11-15T12:21:54.171Z",
      },
    ];
    expect(formatTimestamp(input)).toEqual(expected);
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
    //test that IS date
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
  describe("side effects", () => {
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
});

describe("renameKey", () => {
  test("should return an empty array when called with an empty array", () => {
    expect(renameKey([])).toEqual([]);
  });
  test("should rename a specified key when called with an array with a single object", () => {
    const original = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      },
    ];
    const expected = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        article_name: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      },
    ];
    expect(renameKey(original, "belongs_to", "article_name")).toEqual(expected);
  });
  test("should return a new array, and not mutate the original", () => {
    const original = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      },
    ];
    expect(renameKey(original, "belongs_to", "article_name")).not.toBe(
      original
    );
  });
  test("should work on an array of several objects", () => {
    const original = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      },
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389,
      },
      {
        body:
          "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: 100,
        created_at: 1448282163389,
      },
    ];
    const expected = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        article_name: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      },
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        article_name: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389,
      },
      {
        body:
          "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
        article_name: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: 100,
        created_at: 1448282163389,
      },
    ];
    expect(renameKey(original, "belongs_to", "article_name")).toEqual(expected);
  });
  describe("side effects", () => {
    test("should not mutate any of the objects in the original array", () => {
      const original = [
        {
          body:
            "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          belongs_to: "They're not exactly dogs, are they?",
          created_by: "butter_bridge",
          votes: 16,
          created_at: 1511354163389,
        },
      ];
      expect(renameKey(original, "belongs_to", "article_name")[0]).not.toBe(
        original[0]
      );
      expect(renameKey(original, "belongs_to", "article_name")[0]).toEqual({
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        article_name: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      });
    });
  });
});

describe("createRefObject", () => {
  test("should return an empty object when called with an empty array", () => {
    expect(createRefObject([])).toEqual({});
  });
  test("should return an object with a key and value set to the corresponding values declared as parameters", () => {
    const input = [
      {
        article_id: 10,
        title: "Seven inspirational thought leaders from Manchester UK",
        body: "Who are we kidding, there is only one, and it's Mitch!",
        votes: 0,
        topic: "mitch",
        author: "rogersop",
      },
    ];
    const expected = {
      "Seven inspirational thought leaders from Manchester UK": 10,
    };
    expect(createRefObject(input, "title", "article_id")).toEqual(expected);
  });
  test("should work on an array of several objects", () => {
    const input = [
      {
        article_id: 10,
        title: "Seven inspirational thought leaders from Manchester UK",
        body: "Who are we kidding, there is only one, and it's Mitch!",
        votes: 0,
        topic: "mitch",
        author: "rogersop",
      },
      {
        article_id: 11,
        title: "Am I a cat?",
        body:
          "Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?",
        votes: 0,
        topic: "mitch",
        author: "icellusedkars",
      },
      {
        article_id: 12,
        title: "Moustache",
        body: "Have you seen the size of that thing?",
        votes: 0,
        topic: "mitch",
        author: "butter_bridge",
      },
    ];
    const expected = {
      "Seven inspirational thought leaders from Manchester UK": 10,
      "Am I a cat?": 11,
      Moustache: 12,
    };
    expect(createRefObject(input, "title", "article_id")).toEqual(expected);
  });
  describe("side effects", () => {
    test("should not mutate original array or objects within", () => {
      const input = [
        {
          article_id: 10,
          title: "Seven inspirational thought leaders from Manchester UK",
          body: "Who are we kidding, there is only one, and it's Mitch!",
          votes: 0,
          topic: "mitch",
          author: "rogersop",
        },
      ];
      const expected = {
        "Seven inspirational thought leaders from Manchester UK": 10,
      };
      createRefObject(input, "title", "article_id");
      expect(input).toEqual([
        {
          article_id: 10,
          title: "Seven inspirational thought leaders from Manchester UK",
          body: "Who are we kidding, there is only one, and it's Mitch!",
          votes: 0,
          topic: "mitch",
          author: "rogersop",
        },
      ]);
    });
  });
});

describe("addKeyFromRefObject", () => {
  test("should return an empty array when called with an empty array", () => {
    expect(addKeyFromRefObject([], {}, "", "")).toEqual([]);
  });
  test("should replace a key using the reference object to find the corresponding value on a single item", () => {
    const array = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        votes: 16,
        created_at: "2017-11-22T12:36:03.389Z",
        author: "butter_bridge",
      },
    ];
    const refObj = {
      "They're not exactly dogs, are they?": 9,
    };
    const expected = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        article_id: 9,
        votes: 16,
        created_at: "2017-11-22T12:36:03.389Z",
        author: "butter_bridge",
      },
    ];
    expect(
      addKeyFromRefObject(array, refObj, "belongs_to", "article_id")
    ).toEqual(expected);
  });
  test("should work on an array of objects", () => {
    const input = [
      {
        body: "This is a bad article name",
        belongs_to: "A",
        votes: 1,
        created_at: "2002-11-26T12:36:03.389Z",
        author: "butter_bridge",
      },
      {
        body: "The owls are not what they seem.",
        belongs_to: "They're not exactly dogs, are they?",
        votes: 20,
        created_at: "2001-11-26T12:36:03.389Z",
        author: "icellusedkars",
      },
      {
        body: "This morning, I showered for nine minutes.",
        belongs_to: "Living in the shadow of a great man",
        votes: 16,
        created_at: "2000-11-26T12:36:03.389Z",
        author: "butter_bridge",
      },
    ];
    const refObject = {
      "Living in the shadow of a great man": 1,
      A: 6,
      "They're not exactly dogs, are they?": 9,
    };
    const expected = [
      {
        body: "This is a bad article name",
        article_id: 6,
        votes: 1,
        created_at: "2002-11-26T12:36:03.389Z",
        author: "butter_bridge",
      },
      {
        body: "The owls are not what they seem.",
        article_id: 9,
        votes: 20,
        created_at: "2001-11-26T12:36:03.389Z",
        author: "icellusedkars",
      },
      {
        body: "This morning, I showered for nine minutes.",
        article_id: 1,
        votes: 16,
        created_at: "2000-11-26T12:36:03.389Z",
        author: "butter_bridge",
      },
    ];
    expect(
      addKeyFromRefObject(input, refObject, "belongs_to", "article_id")
    ).toEqual(expected);
  });
  describe("side effects", () => {
    test("should return a new array and objects, not mutating the original inputs", () => {
      const input = [
        {
          body: "This is a bad article name",
          belongs_to: "A",
          votes: 1,
          created_at: "2002-11-26T12:36:03.389Z",
          author: "butter_bridge",
        },
        {
          body: "The owls are not what they seem.",
          belongs_to: "They're not exactly dogs, are they?",
          votes: 20,
          created_at: "2001-11-26T12:36:03.389Z",
          author: "icellusedkars",
        },
        {
          body: "This morning, I showered for nine minutes.",
          belongs_to: "Living in the shadow of a great man",
          votes: 16,
          created_at: "2000-11-26T12:36:03.389Z",
          author: "butter_bridge",
        },
      ];
      const refObject = {
        "Living in the shadow of a great man": 1,
        A: 6,
        "They're not exactly dogs, are they?": 9,
      };
      const expected = [
        {
          body: "This is a bad article name",
          article_id: 6,
          votes: 1,
          created_at: "2002-11-26T12:36:03.389Z",
          author: "butter_bridge",
        },
        {
          body: "The owls are not what they seem.",
          article_id: 9,
          votes: 20,
          created_at: "2001-11-26T12:36:03.389Z",
          author: "icellusedkars",
        },
        {
          body: "This morning, I showered for nine minutes.",
          article_id: 1,
          votes: 16,
          created_at: "2000-11-26T12:36:03.389Z",
          author: "butter_bridge",
        },
      ];
      expect(
        addKeyFromRefObject(input, refObject, "belongs_to", "article_id")
      ).not.toBe(input);
      expect(
        addKeyFromRefObject(input, refObject, "belongs_to", "article_id")[0]
      ).not.toBe(input[0]);
    });
  });
});

describe("coerceObjValuesToNumbers", () => {
  it("should return an empty object when called with an array containing an empty object", () => {
    expect(coerceObjValuesToNums([{}])).toEqual([{}]);
  });
  it("should return an object untouched if there are no number values stored as strings", () => {
    expect(coerceObjValuesToNums([{ a: "a", b: "b" }])).toEqual([
      {
        a: "a",
        b: "b",
      },
    ]);
  });
  it("should return an object after coercing any values which are numbers stored as strings into Number data types", () => {
    expect(coerceObjValuesToNums([{ a: "1" }])).toEqual([{ a: 1 }]);
  });
  it("should work on all items in an array", () => {
    expect(
      coerceObjValuesToNums([{ a: "1" }, { b: "2" }, { c: "c" }, { d: 4 }])
    ).toEqual([{ a: 1 }, { b: 2 }, { c: "c" }, { d: 4 }]);
  });
  it("should not mutate original array or objects within", () => {
    const input = [{ a: "1" }];
    expect(coerceObjValuesToNums(input)).not.toBe(input);
    expect(coerceObjValuesToNums(input)[0]).not.toBe(input[0]);
  });
});

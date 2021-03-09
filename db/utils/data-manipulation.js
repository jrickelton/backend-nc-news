// extract any functions you are using to manipulate your data, into this file
exports.formatTimestamp = (array) => {
  return array.map((object) => {
    const newObject = { ...object };
    if (!object["created_at"]) return newObject;
    newObject["created_at"] = new Date(newObject.created_at).toISOString();
    return newObject;
  });
};

exports.renameKey = (array, oldKey, newKey) => {
  const newArr = [...array];
  if (!array.length) return newArr;
  return newArr.map((object) => {
    const newObj = { ...object };
    newObj[newKey] = newObj[oldKey];
    delete newObj[oldKey];
    return newObj;
  });
};

exports.createRefObject = (array, key, value) => {
  const refObject = {};

  array.forEach((object) => {
    refObject[object[key]] = object[value];
  });
  return refObject;
};

exports.addKeyFromRefObject = (array, refObject, keyToReplace, keyToAdd) => {
  const newArr = [...array];

  return newArr.map((obj) => {
    newObj = { ...obj };
    newObj[keyToAdd] = refObject[obj[keyToReplace]];
    delete newObj[keyToReplace];
    return newObj;
  });
};

/*
{
    body: 'This is a bad article name',
    belongs_to: 'A',
    votes: 1,
    created_at: '2002-11-26T12:36:03.389Z',
    author: 'butter_bridge'
  },
  {
    body: 'The owls are not what they seem.',
    belongs_to: "They're not exactly dogs, are they?",
    votes: 20,
    created_at: '2001-11-26T12:36:03.389Z',
    author: 'icellusedkars'
  },
  {
    body: 'This morning, I showered for nine minutes.',
    belongs_to: 'Living in the shadow of a great man',
    votes: 16,
    created_at: '2000-11-26T12:36:03.389Z',
    author: 'butter_bridge'
  }

{
  'Living in the shadow of a great man': 1,
  'Sony Vaio; or, The Laptop': 2,
  'Eight pug gifs that remind me of mitch': 3,
  'Student SUES Mitch!': 4,
  'UNCOVERED: catspiracy to bring down democracy': 5,
  A: 6,
  Z: 7,
  'Does Mitch predate civilisation?': 8,
  "They're not exactly dogs, are they?": 9,
  'Seven inspirational thought leaders from Manchester UK': 10,
  'Am I a cat?': 11,
  Moustache: 12
}*/

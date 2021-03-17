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
  if (!array.length) return [];
  return array.map((object) => {
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
  return array.map((obj) => {
    const newObj = { ...obj };
    newObj[keyToAdd] = refObject[obj[keyToReplace]];
    delete newObj[keyToReplace];
    return newObj;
  });
};

exports.coerceObjValuesToNums = (array) => {
  return array.map((object) => {
    const newObj = { ...object };
    for (property in newObj) {
      if (!isNaN(parseFloat(newObj[property]))) {
        newObj[property] = parseFloat(newObj[property]);
      }
    }
    return newObj;
  });
};

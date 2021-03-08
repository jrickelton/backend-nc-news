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

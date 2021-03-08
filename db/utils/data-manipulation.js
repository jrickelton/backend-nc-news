// extract any functions you are using to manipulate your data, into this file
exports.formatTimestamp = (array) => {
  return array.map((object) => {
    const newObject = { ...object };
    if (!object["created_at"]) return newObject;
    newObject["created_at"] = new Date(newObject.created_at).toISOString();
    return newObject;
  });
};

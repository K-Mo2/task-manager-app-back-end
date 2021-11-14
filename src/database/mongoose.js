const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/test";

async function main(schemaName, schema, data) {
  await mongoose.connect(url);

  const Model = mongoose.model(`${schemaName}`, schema);

  if (!data) {
    return Model;
  }

  const modelInstance = new Model(data);

  return modelInstance;
}

module.exports = { main };

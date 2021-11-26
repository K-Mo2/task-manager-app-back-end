const mongoose = require("mongoose");

const url = process.env.DATABASE_URL;

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

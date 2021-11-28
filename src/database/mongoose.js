const mongoose = require("mongoose");

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
async function main(schemaName, schema, data) {
  await mongoose.connect(process.env.DATABASE_URL, connectionParams);

  const Model = mongoose.model(`${schemaName}`, schema);

  if (!data) {
    return Model;
  }

  const modelInstance = new Model(data);

  return modelInstance;
}

module.exports = { main };

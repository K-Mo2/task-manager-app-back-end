const mongoose = require("mongoose");
const userSchema = require("../models/users");

const url = "mongodb://localhost:27017/test";

async function main(schemaName, schema, data) {
  await mongoose.connect(url);

  const User = mongoose.model(`${schemaName}`, schema);

  if (!data) {
    return User;
  }
  
  const dataInstance = new User(data);

  return dataInstance;
}

module.exports = { main };

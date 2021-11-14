const mongoose = require("mongoose");
const userSchema = require("../models/users");

const url = "mongodb://localhost:27017/test";

async function main(user) {
  await mongoose.connect(url);

  const User = mongoose.model("User", userSchema);

  const user1 = new User(user);

  return user1.save();
}

module.exports = { main };

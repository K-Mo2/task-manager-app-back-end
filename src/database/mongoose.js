const mongoose = require("mongoose");
const userSchema = require("../models/users");

const url = "mongodb://localhost:27017/test";

async function main() {
  await mongoose.connect(url);

  const User = mongoose.model("User", userSchema);

  const user1 = new User({
    email: "k@yahoo.com",
    password: "1234567",
  });
  return await user1.save();
}

main()
  .then((user1) => console.log(user1))
  .catch((error) => console.log(error));

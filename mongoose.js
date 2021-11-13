const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/test";

async function main() {
  await mongoose.connect(url);

  const accountSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      validate(value) {
        if (!value.includes("@" && ".com")) {
          throw new Error("Error: Invalid Email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (
          value.trim().length < 6 ||
          value.toLowerCase().includes("password")
        ) {
          throw new Error("Error: Invalid Password");
        }
      },
    },
  });

  const Account = mongoose.model("Task", accountSchema);

  const account1 = new Account({
    email: "k@yahoo.com",
    password: "1234567",
  });
  return await account1.save();
}

main()
  .then((task1) => console.log(task1))
  .catch((error) => console.log(error));

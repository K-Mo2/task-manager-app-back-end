const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
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
      if (value.trim().length < 6 || value.toLowerCase().includes("password")) {
        throw new Error("Error: Invalid Password");
      }
    },
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});
module.exports = userSchema;

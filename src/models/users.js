const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { main } = require("../database/mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
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

userSchema.statics.findByCredentials = async function (email, password) {
  const user = await main("users", userSchema);
  const result = await user.findOne({ email });
  if (!result) {
    throw new Error("Failed to login");
  }

  const isMatch = await bcrypt.compare(password, result.password);

  if (!isMatch) {
    throw new Error("Failed to login");
  }

  return result;
};

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});
module.exports = userSchema;

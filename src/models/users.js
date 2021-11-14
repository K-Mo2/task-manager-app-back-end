const mongoose = require("mongoose");

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


module.exports = userSchema;

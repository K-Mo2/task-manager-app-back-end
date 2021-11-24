const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { main } = require("../database/mongoose");
const jwt = require("jsonwebtoken");
const taskSchema = require("./tasks");

const userSchema = new mongoose.Schema(
  {
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
        if (
          value.trim().length < 6 ||
          value.toLowerCase().includes("password")
        ) {
          throw new Error("Error: Invalid Password");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = async function () {
  user = this;

  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "secret");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

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

userSchema.pre("remove", async function (next) {
  const user = this;
  const modelInstance = await main("tasks", taskSchema);
  const result = await modelInstance.deleteMany({ owner: user._id });
  next();
});
module.exports = userSchema;

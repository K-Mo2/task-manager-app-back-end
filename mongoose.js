const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/test";

async function main() {
  await mongoose.connect(url);
}

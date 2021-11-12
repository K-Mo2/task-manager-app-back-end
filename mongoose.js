const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/test";

async function main() {
  await mongoose.connect(url);

  const taskSchema = new mongoose.Schema({
    description: String,
    completed: Boolean,
  });

  const Task = mongoose.model("Task", taskSchema);

  const task1 = new Task({ description: "Going home", completed: true });
  return await task1.save();
}

main()
  .then((task1) => console.log(task1))
  .catch(() => console.error);

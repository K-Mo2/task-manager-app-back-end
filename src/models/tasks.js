const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
});

module.exports = taskSchema;

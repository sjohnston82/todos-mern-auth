const mongoose = require("mongoose");

const Todo = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
  },
  completedOn: {
    type: Date,
    default: null,
  },
  owner: {
    type: String,
  },
});

module.exports = mongoose.model("Todo", Todo);

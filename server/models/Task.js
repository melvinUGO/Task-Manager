const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "must provide name"],
      trim: true,
      maxlength: [20, "name can not be more than 20 characters"],
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Task = mongoose.models?.Task || mongoose.model("Task", TaskSchema);

module.exports = Task;

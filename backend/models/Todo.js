const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {       // <-- Add this part
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean, // make it Boolean (true/false) instead of String
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", TodoSchema);

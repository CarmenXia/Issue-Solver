const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    priority: { type: String, enum: ["High", "Medium", "Low"] },
    belongTo: { type: mongoose.Types.ObjectId, ref: "Ticket" },
    status: { type: String, enum: ["Open", "In progress", "Solved"] },
    author: { type: mongoose.Types.ObjectId, ref: "User" },
    replies: [{ type: mongoose.Types.ObjectId, ref: "Reply" }],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Issue", IssueSchema);

const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    author: { type: mongoose.Types.ObjectId, ref: "User" },
    priority: { type: String, enum: ["High", "Medium", "Low"] },
    status: { type: String, enum: ["Open", "In progress", "Completed"] },
    deadLine: Date,
    completedDate: Date,
    members: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    issues: [{ type: mongoose.Types.ObjectId, ref: "Issue" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", TicketSchema);

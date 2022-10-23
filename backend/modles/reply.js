const mongoose = require("mongoose");
const ReplySchema = new mongoose.Schema(
  {
    content: String,
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    issueId: {
      type: mongoose.Types.ObjectId,
      ref: "Issue",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Reply", ReplySchema);

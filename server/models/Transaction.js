const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
    enum: ["income", "expense"],
  },
  amount: Number,
  category: String,
  date: { type: Date, default: Date.now },
  note: String,
  isRecurring: {
    type: Boolean,
    default: false,
  },
  recurringType: {
    type: String,
    enum: [
      "daily",
      "weekly",
      "monthly"
    ],
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
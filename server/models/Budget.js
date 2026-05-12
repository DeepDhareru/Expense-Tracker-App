const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  amount: {
    type: Number,
    required: true,
  },

});

module.exports = mongoose.model(
  "Budget",
  budgetSchema
);
const Transaction = require("../models/Transaction");
const mongoose = require("mongoose");

exports.getMonthlyAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await Transaction.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) },
      },
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: { "_id": 1 },
      },
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Category-wise analytics
exports.getCategoryAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await Transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          type: "expense",
        },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: { total: -1 },
      },
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// AI Insights
exports.getInsights = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await Transaction.find({ userId });

    let totalExpense = 0;
    let categoryMap = {};

    data.forEach((t) => {
      if (t.type === "expense") {
        totalExpense += t.amount;

        if (!categoryMap[t.category]) {
          categoryMap[t.category] = 0;
        }

        categoryMap[t.category] += t.amount;
      }
    });

    // find highest spending category
    let maxCategory = "";
    let maxAmount = 0;

    for (let cat in categoryMap) {
      if (categoryMap[cat] > maxAmount) {
        maxAmount = categoryMap[cat];
        maxCategory = cat;
      }
    }

    const percentage = ((maxAmount / totalExpense) * 100).toFixed(1);

    const insights = [
      `You are spending most on ${maxCategory} (${percentage}%)`,
      `Your total expense is ₹${totalExpense}`,
    ];

    res.json({ insights });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
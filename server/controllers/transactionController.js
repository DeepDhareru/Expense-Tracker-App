const Transaction = require("../models/Transaction");
const redis = require("../config/redis");

// ➕ Add Transaction
exports.addTransaction = async (req, res) => {
  try {
    const { type, amount, category, note } = req.body;

    const newTransaction = await Transaction.create({
      userId: req.user.id,
      type,
      amount,
      category,
      note,
    });

    // ❗ Cache clear (VERY IMPORTANT)
    await redis.del(`transactions:${req.user.id}`);

    res.json(newTransaction);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 📥 Get Transactions (with Redis cache)
exports.getTransactions = async (req, res) => {
  try {
    const cacheKey = `transactions:${req.user.id}`;

    // 🔍 Check cache
    const cached = await redis.get(cacheKey);

    if (cached) {
      console.log("⚡ Cache Hit");
      return res.json(JSON.parse(cached));
    }

    console.log("🐢 DB Hit");

    const transactions = await Transaction.find({
      userId: req.user.id,
    }).sort({ date: -1 });

    // 💾 Store in cache (60 sec)
    await redis.set(cacheKey, JSON.stringify(transactions), "EX", 60);

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// ❌ Delete Transaction
exports.deleteTransaction = async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);

    // cache clear
    await redis.del(`transactions:${req.user.id}`);

    res.json({ msg: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const Budget = require("../models/Budget");

// SET BUDGET
exports.setBudget = async (
  req,
  res
) => {

  try {

    const { amount } = req.body;

    let budget =
      await Budget.findOne({
        userId: req.user.id,
      });

    // UPDATE
    if (budget) {

      budget.amount = amount;

      await budget.save();

    } else {

      // CREATE
      budget = await Budget.create({
        userId: req.user.id,
        amount,
      });
    }

    res.json(budget);

  } catch (err) {

    res.status(500).json({
      msg: err.message,
    });
  }
};

// GET BUDGET
exports.getBudget = async (
  req,
  res
) => {

  try {

    const budget =
      await Budget.findOne({
        userId: req.user.id,
      });

    res.json(budget);

  } catch (err) {

    res.status(500).json({
      msg: err.message,
    });
  }
};
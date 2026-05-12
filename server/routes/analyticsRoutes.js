const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getMonthlyAnalytics,
  getCategoryAnalytics,
  getInsights,
} = require("../controllers/analyticsController");

router.get("/monthly", authMiddleware, getMonthlyAnalytics);
router.get("/category", authMiddleware, getCategoryAnalytics);
router.get("/insights", authMiddleware, getInsights);

module.exports = router;
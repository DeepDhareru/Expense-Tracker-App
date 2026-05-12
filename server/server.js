require("dotenv").config();
const express = require('express');
// const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const otpRoutes = require("./routes/otpRoutes");
const aiRoutes = require("./routes/aiRoutes");

// const redis = require("./config/redis");

// (async () => {
//   await redis.set("test", "Hello Redis");
//   const data = await redis.get("test");
//   console.log("Redis Test:", data);
// })();

connectDB();

// dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/otp", otpRoutes);
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use("/api/ai", aiRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
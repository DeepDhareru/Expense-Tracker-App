import { useEffect, useState } from "react";

import API from "../services/api";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import FinancialScoreCard from "../components/analytics/FinancialScoreCard";
import WeeklyAnalytics from "../components/analytics/WeeklyAnalytics";
import SmartInsights from "../components/analytics/SmartInsights";
import ExpenseHeatmap from "../components/analytics/ExpenseHeatmap";

import {
  Bar,
  Pie,
  Line,
} from "react-chartjs-2";

import "chart.js/auto";

import Card from "../components/ui/Card";

import { useTheme } from "../context/ThemeContext";

export default function Analytics() {

  const { darkMode } = useTheme();

  // STATES
  const [monthly, setMonthly] =
    useState([]);

  const [category, setCategory] =
    useState([]);

  const [transactions, setTransactions] =
    useState([]);

  const filteredTransactions = transactions;

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // FETCH DATA
  const fetchAnalytics = async () => {

    try {

      const m =
        await API.get(
          "/analytics/monthly"
        );

      const c =
        await API.get(
          "/analytics/category"
        );

      const t =
        await API.get(
          "/transactions"
        );

      setMonthly(m.data);

      setCategory(c.data);

      setTransactions(t.data);

    } catch (err) {
      console.log(err);
    }
  };

  // TOTALS
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce(
      (acc, curr) =>
        acc + curr.amount,
      0
    );

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce(
      (acc, curr) =>
        acc + curr.amount,
      0
    );

  // BAR DATA
  const barData = {

    labels: monthly.map(
      (d) => `Month ${d._id}`
    ),

    datasets: [
      {
        label: "Expenses",

        data: monthly.map(
          (d) => d.total
        ),

        backgroundColor:
          "#6366f1",
      },
    ],
  };

  // PIE DATA
  const pieData = {

    labels: category.map(
      (d) => d._id
    ),

    datasets: [
      {
        data: category.map(
          (d) => d.total
        ),

        backgroundColor: [
          "#6366f1",
          "#22c55e",
          "#ef4444",
          "#f59e0b",
          "#06b6d4",
        ],
      },
    ],
  };

  // LINE DATA
  const lineData = {

    labels: monthly.map(
      (d) => `Month ${d._id}`
    ),

    datasets: [
      {
        label: "Spending Trend",

        data: monthly.map(
          (d) => d.total
        ),

        borderColor:
          "#8b5cf6",

        tension: 0.4,

        fill: false,
      },
    ],
  };

  return (

    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >

      {/* NAVBAR */}
      <Navbar />

      <div className="flex">

        {/* SIDEBAR */}
        <Sidebar />

        {/* CONTENT */}
        <div className="flex-1 p-8">

          {/* PAGE TITLE */}
          <div className="mb-8">

            <h1 className="text-4xl font-bold">
              Analytics Dashboard
            </h1>

            <p
              className={`mt-2 ${
                darkMode
                  ? "text-gray-300"
                  : "text-gray-500"
              }`}
            >
              Track spending trends and
              financial insights
            </p>

          </div>

          {/* SUMMARY */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* INCOME */}
            <Card>

              <h2 className="text-xl font-semibold">
                Total Income
              </h2>

              <h1 className="text-4xl font-bold text-green-500 mt-4">

                ₹{totalIncome}

              </h1>

            </Card>

            {/* EXPENSE */}
            <Card>

              <h2 className="text-xl font-semibold">
                Total Expenses
              </h2>

              <h1 className="text-4xl font-bold text-red-500 mt-4">

                ₹{totalExpense}

              </h1>

            </Card>

          </div>

          {/* CHARTS */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">

            {/* BAR */}
            <Card className="h-[420px]">

              <h2 className="text-2xl font-bold mb-6">

                Monthly Expenses

              </h2>

              <Bar
                data={barData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />

            </Card>

            {/* PIE */}
            <Card className="h-[420px]">

              <h2 className="text-2xl font-bold mb-6">

                Expense Categories

              </h2>

              <Pie
                data={pieData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />

            </Card>

          </div>

          {/* LINE CHART */}
          <div className="mt-8">

            <Card className="h-[500px]">

              <h2 className="text-2xl font-bold mb-6">

                Spending Trend

              </h2>

              <Line
                data={lineData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />

            </Card>

          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">

  <FinancialScoreCard

    income={totalIncome}

    expense={totalExpense}

  />

  <WeeklyAnalytics

    transactions={
      filteredTransactions
    }

  />

</div>

<div className="grid md:grid-cols-2 gap-6 mt-8">

  <SmartInsights

    income={totalIncome}

    expense={totalExpense}

    category={category}

  />

  <ExpenseHeatmap

    transactions={
      filteredTransactions
    }

  />

</div>

          {/* RECENT ANALYTICS */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">

            {/* CARD 1 */}
            <Card>

              <h2 className="text-lg font-semibold">

                Highest Spending Category

              </h2>

              <h1 className="text-3xl font-bold mt-4 text-blue-500">

                {category[0]?._id || "N/A"}

              </h1>

            </Card>

            {/* CARD 2 */}
            <Card>

              <h2 className="text-lg font-semibold">

                Transactions Count

              </h2>

              <h1 className="text-3xl font-bold mt-4 text-purple-500">

                {transactions.length}

              </h1>

            </Card>

            {/* CARD 3 */}
            <Card>

              <h2 className="text-lg font-semibold">

                Savings

              </h2>

              <h1 className="text-3xl font-bold mt-4 text-green-500">

                ₹
                {totalIncome -
                  totalExpense}

              </h1>

            </Card>

          </div>

        </div>
      </div>
    </div>
  );
}
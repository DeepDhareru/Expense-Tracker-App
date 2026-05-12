import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import API from "../services/api";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

import SummaryCards from "../components/dashboard/SummaryCards";
import BudgetSection from "../components/dashboard/BudgetSection";
import AddTransactionForm from "../components/forms/AddTransactionForm";
import ChartsSection from "../components/dashboard/ChartsSection";
import InsightsSection from "../components/dashboard/InsightsSection";
import TransactionsSection from "../components/dashboard/TransactionsSection";
import FilterSection from "../components/dashboard/FilterSection";
import PDFExportButton from "../components/dashboard/PDFExportButton";
import BudgetAlert from "../components/dashboard/BudgetAlert";
import ExcelExportButton from "../components/dashboard/ExcelExportButton";
import AIInsightsCards from "../components/dashboard/AIInsightsCards";

import { useTheme } from "../context/ThemeContext";

export default function Dashboard() {

  const { darkMode } = useTheme();

  // STATES
  const [monthly, setMonthly] = useState([]);
  const [category, setCategory] = useState([]);
  const [insights, setInsights] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [budget, setBudget] =
    useState(null);

  // FILTER STATES
  const [search, setSearch] =
    useState("");

  const [filterType, setFilterType] =
    useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  // FETCH
  const fetchData = async () => {

    try {

      const m =
        await API.get(
          "/analytics/monthly"
        );

      const c =
        await API.get(
          "/analytics/category"
        );

      const i =
        await API.get(
          "/analytics/insights"
        );

      const t =
        await API.get(
          "/transactions"
        );

      const b =
        await API.get(
          "/budget"
        );

      setMonthly(m.data);

      setCategory(c.data);

      setInsights(i.data.insights);

      setTransactions(t.data);

      setBudget(b.data);

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

  const balance =
    totalIncome - totalExpense;

  useEffect(() => {

  if (!budget) return;

  const percent =
    (totalExpense /
      budget.amount) *
    100;

  // WARNING
  if (
    percent >= 80 &&
    percent < 100
  ) {

    toast(
      "⚠️ You have used 80% of your budget"
    );
  }

  // EXCEEDED
  if (percent >= 100) {

    toast.error(
      "🚨 Budget Exceeded!"
    );
  }

}, [
  totalExpense,
  budget,
]);

  // FILTER LOGIC
  const filteredTransactions =
    transactions.filter((item) => {

      const matchesSearch =
        item.category
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesFilter =
        filterType === "all"
          ? true
          : item.type === filterType;

      return (
        matchesSearch &&
        matchesFilter
      );
    });

  return (

    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >

      {/* TOP NAVBAR */}
      <Navbar />

      {/* MAIN LAYOUT */}
      <div className="flex">

        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <div className="flex-1 p-8">

          {/* SUMMARY */}
          <SummaryCards
            balance={balance}
            income={totalIncome}
            expense={totalExpense}
          />

          {/* BUDGET ALERT */}
          <BudgetAlert
            budget={budget}
            expense={totalExpense}
          />

          {/* PDF BUTTON */}
          <div className="mt-8">

            <PDFExportButton

              transactions={
                transactions
              }

              income={totalIncome}

              expense={totalExpense}

              balance={balance}

            />

          </div>

          {/* EXCEL EXPORT */}
          <div className="mt-4">
            <ExcelExportButton
              transactions={
                transactions
              }
            />
          </div>

          <AIInsightsCards
            transactions={
              transactions
            }
          />

          {/* BUDGET */}
          <BudgetSection

            budget={budget}

            expense={totalExpense}

            refresh={fetchData}

          />

          {/* FILTERS */}
          <FilterSection

            search={search}

            setSearch={setSearch}

            filterType={filterType}

            setFilterType={
              setFilterType
            }

          />

          {/* ADD FORM */}
          <AddTransactionForm
            refresh={fetchData}
          />

          {/* CHARTS */}
          <ChartsSection

            monthly={monthly}

            category={category}

          />

          {/* INSIGHTS */}
          <InsightsSection
            insights={insights}
          />

          {/* TRANSACTIONS */}
          <TransactionsSection

            transactions={
              filteredTransactions
            }

            refresh={fetchData}

          />

        </div>
      </div>
    </div>
  );
}
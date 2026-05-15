import { useEffect, useState } from "react";

import API from "../services/api";

// import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

import Card from "../components/ui/Card";

import {

  Search,
  Trash2,
  ArrowDownCircle,
  ArrowUpCircle,

} from "lucide-react";

import { useTheme } from "../context/ThemeContext";

import toast from "react-hot-toast";

export default function Transactions() {

  const { darkMode } = useTheme();

  // STATES
  const [transactions, setTransactions] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [filterType, setFilterType] =
    useState("all");

  useEffect(() => {
    fetchTransactions();
  }, []);

  // FETCH
  const fetchTransactions = async () => {

    try {

      const res =
        await API.get(
          "/transactions"
        );

      setTransactions(res.data);

    } catch (err) {

      console.log(err);
    }
  };

  // DELETE
  const deleteTransaction = async (
    id
  ) => {

    try {

      await API.delete(
        `/transactions/${id}`
      );

      toast.success(
        "Transaction Deleted"
      );

      fetchTransactions();

    } catch (err) {

      toast.error(
        "Delete Failed"
      );
    }
  };

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

    

      <div className="flex flex-col md:flex-row">

        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <div className="flex-1 p-4 md:p-8">

          {/* HEADER */}
          <div className="mb-8">

            <h1 className="text-4xl font-bold">

              Transactions

            </h1>

            <p
              className={`mt-2 ${
                darkMode
                  ? "text-gray-300"
                  : "text-gray-500"
              }`}
            >

              Manage all your financial transactions

            </p>

          </div>

          {/* FILTERS */}
          <Card className="mb-8">

            <div className="flex flex-col md:flex-row gap-4">

              {/* SEARCH */}
              <div className="relative flex-1">

                <Search
                  className={`absolute left-4 top-3 ${
                    darkMode
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                  size={20}
                />

                <input
                  type="text"
                  placeholder="Search category..."
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  className={`w-full pl-12 p-3 rounded-xl border outline-none ${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white"
                  }`}
                />

              </div>

              {/* FILTER */}
              <select
                value={filterType}
                onChange={(e) =>
                  setFilterType(
                    e.target.value
                  )
                }
                className="p-3 rounded-xl border bg-white text-black md:w-[220px]"
              >

                <option value="all">
                  All
                </option>

                <option value="income">
                  Income
                </option>

                <option value="expense">
                  Expense
                </option>

              </select>

            </div>

          </Card>

          {/* TRANSACTIONS */}
          <div className="space-y-6">

            {filteredTransactions.length > 0 ? (

              filteredTransactions.map(
                (item) => (

                  <Card
                    key={item._id}
                  >

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                      {/* LEFT */}
                      <div className="flex items-center gap-4">

                        {/* ICON */}
                        <div
                          className={`p-4 rounded-2xl ${
                            item.type ===
                            "income"

                              ? "bg-green-100"

                              : "bg-red-100"
                          }`}
                        >

                          {item.type ===
                          "income" ? (

                            <ArrowUpCircle className="text-green-600" />

                          ) : (

                            <ArrowDownCircle className="text-red-600" />

                          )}

                        </div>

                        {/* DETAILS */}
                        <div>

                          <h2 className="text-2xl font-bold">

                            {item.category}

                          </h2>

                          <p
                            className={`mt-1 ${
                              darkMode
                                ? "text-gray-300"
                                : "text-gray-500"
                            }`}
                          >

                            {item.type}

                          </p>

                          {/* RECURRING */}
                          {item.isRecurring && (

                            <div className="mt-2 inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">

                              🔄 {
                                item.recurringType
                              }

                            </div>
                          )}

                          {/* RECEIPT */}
                          {item.receipt && (

                            <img
                              src={
                                item.receipt
                              }
                              alt="receipt"
                              className="w-24 h-24 object-cover rounded-2xl mt-4"
                            />
                          )}

                        </div>

                      </div>

                      {/* RIGHT */}
                      <div className="flex items-center gap-6">

                        {/* AMOUNT */}
                        <h1
                          className={`text-3xl font-bold ${
                            item.type ===
                            "income"

                              ? "text-green-500"

                              : "text-red-500"
                          }`}
                        >

                          ₹{item.amount}

                        </h1>

                        {/* DELETE */}
                        <button
                          onClick={() =>
                            deleteTransaction(
                              item._id
                            )
                          }
                          className="bg-red-100 hover:bg-red-200 p-3 rounded-2xl transition"
                        >

                          <Trash2
                            className="text-red-600"
                            size={20}
                          />

                        </button>

                      </div>

                    </div>

                  </Card>
                )
              )

            ) : (

              <Card>

                <div className="text-center py-16">

                  <h2 className="text-3xl font-bold">

                    No Transactions Found

                  </h2>

                  <p
                    className={`mt-4 ${
                      darkMode
                        ? "text-gray-300"
                        : "text-gray-500"
                    }`}
                  >

                    Try changing filters or search keyword

                  </p>

                </div>

              </Card>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";

import API from "../services/api";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import {
  Mail,
  User,
  Wallet,
  TrendingUp,
  TrendingDown,
  CalendarDays,
  Camera,
  Pencil,
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";

import toast from "react-hot-toast";

export default function Profile() {

  const { darkMode } = useTheme();

  // USER
  const storedUser = JSON.parse(
    localStorage.getItem("user")
  );

  // STATES
  const [userData, setUserData] =
    useState({
      name:
        storedUser?.name || "",
      email:
        storedUser?.email || "",
    });

  const [transactions, setTransactions] =
    useState([]);

  const [editing, setEditing] =
    useState(false);

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

  // SAVE PROFILE
  const saveProfile = () => {

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    toast.success(
      "Profile Updated"
    );

    setEditing(false);
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

        {/* MAIN CONTENT */}
        <div className="flex-1 p-8">

          {/* HEADER */}
          <div className="mb-8">

            <h1 className="text-4xl font-bold">
              My Profile
            </h1>

            <p
              className={`mt-2 ${
                darkMode
                  ? "text-gray-300"
                  : "text-gray-500"
              }`}
            >
              Manage your personal profile and financial overview
            </p>

          </div>

          {/* PROFILE HERO */}
          <Card className="relative overflow-hidden">

            {/* BACKGROUND */}
            <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-r from-blue-600 to-purple-600" />

            {/* CONTENT */}
            <div className="relative pt-20 pb-6 px-6">

              {/* TOP */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                {/* LEFT */}
                <div className="flex items-center gap-6">

                  {/* AVATAR */}
                  <div className="relative">

                    <img
                      src={`https://ui-avatars.com/api/?name=${userData.name}&background=random&size=200`}
                      alt="avatar"
                      className="w-32 h-32 rounded-full border-4 border-white shadow-xl"
                    />

                    <button className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full">

                      <Camera size={18} />

                    </button>

                  </div>

                  {/* INFO */}
                  <div>

                    {editing ? (

                      <div className="space-y-3">

                        <input
                          type="text"
                          value={
                            userData.name
                          }
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              name:
                                e.target
                                  .value,
                            })
                          }
                          className="p-3 rounded-xl border text-black w-full"
                        />

                        <input
                          type="email"
                          value={
                            userData.email
                          }
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              email:
                                e.target
                                  .value,
                            })
                          }
                          className="p-3 rounded-xl border text-black w-full"
                        />

                      </div>

                    ) : (

                      <>

                        <h2 className="text-4xl font-bold mt-4">

                          {
                            userData.name
                          }

                        </h2>

                        <div className="flex items-center gap-2 mt-3 text-gray-300">

                          <Mail size={18} />

                          {
                            userData.email
                          }

                        </div>

                        <div className="flex items-center gap-2 mt-2 text-gray-300">

                          <CalendarDays size={18} />

                          Joined Recently

                        </div>

                      </>
                    )}

                  </div>

                </div>

                {/* RIGHT */}
                <div>

                  {editing ? (

                    <Button
                      onClick={
                        saveProfile
                      }
                    >
                      Save Profile
                    </Button>

                  ) : (

                    <Button
                      onClick={() =>
                        setEditing(
                          true
                        )
                      }
                      className="flex items-center gap-2"
                    >

                      <Pencil
                        size={18}
                      />

                      Edit Profile

                    </Button>
                  )}

                </div>

              </div>

            </div>

          </Card>

          {/* STATS */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">

            {/* BALANCE */}
            <Card>

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500">
                    Total Balance
                  </p>

                  <h2 className="text-4xl font-bold mt-4">

                    ₹{balance}

                  </h2>

                </div>

                <div className="bg-blue-100 p-4 rounded-2xl">

                  <Wallet className="text-blue-600" />

                </div>

              </div>

            </Card>

            {/* INCOME */}
            <Card>

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500">
                    Total Income
                  </p>

                  <h2 className="text-4xl font-bold mt-4 text-green-500">

                    ₹{totalIncome}

                  </h2>

                </div>

                <div className="bg-green-100 p-4 rounded-2xl">

                  <TrendingUp className="text-green-600" />

                </div>

              </div>

            </Card>

            {/* EXPENSE */}
            <Card>

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500">
                    Total Expenses
                  </p>

                  <h2 className="text-4xl font-bold mt-4 text-red-500">

                    ₹{totalExpense}

                  </h2>

                </div>

                <div className="bg-red-100 p-4 rounded-2xl">

                  <TrendingDown className="text-red-600" />

                </div>

              </div>

            </Card>

          </div>

          {/* ACCOUNT INFO */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">

            {/* PERSONAL INFO */}
            <Card>

              <div className="flex items-center gap-3 mb-6">

                <User className="text-blue-500" />

                <h2 className="text-2xl font-bold">
                  Personal Information
                </h2>

              </div>

              <div className="space-y-6">

                <div>

                  <p className="text-gray-500 text-sm">
                    Full Name
                  </p>

                  <h3 className="text-xl font-semibold mt-1">

                    {userData.name}

                  </h3>

                </div>

                <div>

                  <p className="text-gray-500 text-sm">
                    Email Address
                  </p>

                  <h3 className="text-xl font-semibold mt-1">

                    {userData.email}

                  </h3>

                </div>

              </div>

            </Card>

            {/* ACCOUNT SUMMARY */}
            <Card>

              <h2 className="text-2xl font-bold mb-6">

                Account Summary

              </h2>

              <div className="space-y-5">

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Total Transactions
                  </span>

                  <span className="font-bold">

                    {
                      transactions.length
                    }

                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Income Transactions
                  </span>

                  <span className="font-bold text-green-500">

                    {
                      transactions.filter(
                        (t) =>
                          t.type ===
                          "income"
                      ).length
                    }

                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Expense Transactions
                  </span>

                  <span className="font-bold text-red-500">

                    {
                      transactions.filter(
                        (t) =>
                          t.type ===
                          "expense"
                      ).length
                    }

                  </span>

                </div>

              </div>

            </Card>

          </div>

        </div>
      </div>
    </div>
  );
}
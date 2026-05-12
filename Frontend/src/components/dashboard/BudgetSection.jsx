import { useState } from "react";

import API from "../../services/api";

import Card from "../ui/Card";

export default function BudgetSection({
  budget,
  expense,
  refresh,
}) {

  const [amount, setAmount] =
    useState("");

  const handleBudget = async () => {

    try {

      await API.post("/budget", {
        amount,
      });

      setAmount("");

      refresh();

    } catch (err) {
      console.log(err);
    }
  };

  const percentage =
    budget?.amount
      ? (expense / budget.amount) * 100
      : 0;

  return (

    <Card className="mt-8">

      {/* TITLE */}
      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Monthly Budget
        </h2>

        <div className="text-right">

          <p className="text-sm text-gray-500">
            Remaining
          </p>

          <h3 className="text-xl font-bold text-green-500">

            ₹
            {(budget?.amount || 0) - expense}

          </h3>
        </div>
      </div>

      {/* INPUT */}
      <div className="flex gap-4">

        <input
          type="number"
          placeholder="Set Monthly Budget"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          className="border p-3 rounded-xl w-full"
        />

        <button
          onClick={handleBudget}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 rounded-xl"
        >
          Save
        </button>

      </div>

      {/* PROGRESS */}
      <div className="mt-8">

        <div className="flex justify-between mb-2">

          <p>
            ₹{expense} spent
          </p>

          <p>
            ₹{budget?.amount || 0}
          </p>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">

          <div
            className={`h-4 rounded-full ${
              percentage > 100
                ? "bg-red-500"
                : "bg-green-500"
            }`}
            style={{
              width: `${Math.min(
                percentage,
                100
              )}%`,
            }}
          />

        </div>

        {/* WARNING */}
        {percentage > 100 && (

          <p className="text-red-500 mt-4 font-semibold">

            ⚠ Budget Limit Exceeded

          </p>
        )}

      </div>
    </Card>
  );
}
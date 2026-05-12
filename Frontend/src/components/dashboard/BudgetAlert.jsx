import {
  AlertTriangle,
} from "lucide-react";

import Card from "../ui/Card";

export default function BudgetAlert({

  budget,
  expense,

}) {

  if (!budget) return null;

  const percent =
    Math.round(
      (expense / budget.amount) * 100
    );

  const exceeded =
    expense > budget.amount;

  return (

    <Card
      className={`mt-8 border-2 ${
        exceeded

          ? "border-red-500 bg-red-50"

          : percent > 80

            ? "border-yellow-500 bg-yellow-50"

            : "border-green-500 bg-green-50"
      }`}
    >

      {/* TOP */}
      <div className="flex items-center gap-4">

        <div
          className={`p-4 rounded-2xl ${
            exceeded

              ? "bg-red-100"

              : percent > 80

                ? "bg-yellow-100"

                : "bg-green-100"
          }`}
        >

          <AlertTriangle
            className={`${
              exceeded

                ? "text-red-600"

                : percent > 80

                  ? "text-yellow-600"

                  : "text-green-600"
            }`}
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-black">

            {exceeded

              ? "Budget Exceeded!"

              : percent > 80

                ? "Budget Warning"

                : "Budget Healthy"}

          </h2>

          <p className="text-gray-600 mt-1">

            ₹{expense} spent out of ₹
            {budget.amount}

          </p>

        </div>

      </div>

      {/* PROGRESS */}
      <div className="mt-6">

        <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden">

          <div
            className={`h-5 rounded-full ${
              exceeded

                ? "bg-red-500"

                : percent > 80

                  ? "bg-yellow-500"

                  : "bg-green-500"
            }`}
            style={{
              width: `${
                percent > 100
                  ? 100
                  : percent
              }%`,
            }}
          />

        </div>

        <div className="flex justify-between mt-2 text-sm text-gray-600">

          <span>
            {percent}% used
          </span>

          <span>
            ₹
            {budget.amount -
              expense >
            0

              ? budget.amount -
                expense

              : 0}

            remaining

          </span>

        </div>

      </div>

    </Card>
  );
}
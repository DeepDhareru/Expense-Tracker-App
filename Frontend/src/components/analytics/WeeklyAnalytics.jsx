import Card from "../ui/Card";

export default function WeeklyAnalytics({

  transactions,

}) {

  const weeklyExpense =
    transactions
      .filter(
        (t) =>
          t.type === "expense"
      )
      .reduce(
        (acc, curr) =>
          acc + curr.amount,
        0
      );

  const average =
    transactions.length > 0
      ? Math.round(
          weeklyExpense /
            transactions.length
        )
      : 0;

  return (

    <Card>

      <h2 className="text-2xl font-bold mb-6">

        Weekly Analytics

      </h2>

      <div className="space-y-6">

        <div>

          <p className="text-gray-500">

            Weekly Spending

          </p>

          <h1 className="text-4xl font-bold mt-2 text-red-500">

            ₹{weeklyExpense}

          </h1>

        </div>

        <div>

          <p className="text-gray-500">

            Average Transaction

          </p>

          <h1 className="text-4xl font-bold mt-2 text-blue-500">

            ₹{average}

          </h1>

        </div>

      </div>

    </Card>
  );
}
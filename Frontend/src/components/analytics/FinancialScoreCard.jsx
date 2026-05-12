import Card from "../ui/Card";

export default function FinancialScoreCard({

  income,
  expense,

}) {

  const savings =
    income - expense;

  // HEALTH SCORE
  const score =
    income === 0
      ? 0
      : Math.max(
          0,
          Math.min(
            100,
            Math.round(
              (savings / income) * 100
            )
          )
        );

  // SCORE COLOR
  const scoreColor =
    score > 70
      ? "text-green-500"
      : score > 40
        ? "text-yellow-500"
        : "text-red-500";

  return (

    <Card>

      <h2 className="text-2xl font-bold mb-6">

        Financial Health Score

      </h2>

      {/* SCORE */}
      <div className="flex flex-col items-center">

        <div
          className={`text-7xl font-bold ${scoreColor}`}
        >

          {score}

        </div>

        <p className="text-gray-500 mt-4">

          Your financial health based on savings ratio

        </p>

      </div>

      {/* BAR */}
      <div className="mt-8">

        <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden">

          <div
            className={`h-5 rounded-full ${
              score > 70
                ? "bg-green-500"
                : score > 40
                  ? "bg-yellow-500"
                  : "bg-red-500"
            }`}
            style={{
              width: `${score}%`,
            }}
          />

        </div>

      </div>

    </Card>
  );
}
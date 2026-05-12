import Card from "../ui/Card";

export default function AIInsightsCards({

  transactions,

}) {

  // TOTALS
  const expenses =
    transactions.filter(
      (t) =>
        t.type === "expense"
    );

  const income =
    transactions

      .filter(
        (t) =>
          t.type === "income"
      )

      .reduce(
        (acc, curr) =>
          acc + curr.amount,
        0
      );

  const expenseTotal =
    expenses.reduce(
      (acc, curr) =>
        acc + curr.amount,
      0
    );

  // CATEGORY ANALYSIS
  const categoryMap = {};

  expenses.forEach((item) => {

    if (
      categoryMap[item.category]
    ) {

      categoryMap[item.category] +=
        item.amount;

    } else {

      categoryMap[item.category] =
        item.amount;
    }
  });

  // TOP CATEGORY
  const topCategory =
    Object.keys(categoryMap)
      .sort(
        (a, b) =>
          categoryMap[b] -
          categoryMap[a]
      )[0];

  // SAVINGS RATE
  const savings =
    income - expenseTotal;

  const savingsRate =
    income > 0

      ? Math.round(
          (savings / income) *
            100
        )

      : 0;

  // INSIGHTS
  const insights = [

    {
      title:
        "Highest Spending",

      value:
        topCategory || "N/A",

      description:
        `You are spending most on ${topCategory}.`,

      color:
        "from-red-500 to-pink-500",
    },

    {
      title:
        "Savings Rate",

      value:
        `${savingsRate}%`,

      description:
        savingsRate > 30

          ? "Excellent savings habit!"

          : "Try increasing your savings.",

      color:
        "from-green-500 to-emerald-500",
    },

    {
      title:
        "Expense Ratio",

      value:
        income > 0

          ? `${Math.round(
              (expenseTotal /
                income) *
                100
            )}%`

          : "0%",

      description:
        "Percentage of income spent.",

      color:
        "from-blue-500 to-cyan-500",
    },

  ];

  return (

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

      {insights.map(
        (item, index) => (

          <Card
            key={index}
            className={`bg-gradient-to-r ${item.color} text-white overflow-hidden relative`}
          >

            {/* GLOW */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />

            <div className="relative z-10">

              <p className="text-sm opacity-80">

                {item.title}

              </p>

              <h2 className="text-4xl font-bold mt-4">

                {item.value}

              </h2>

              <p className="mt-4 opacity-90">

                {
                  item.description
                }

              </p>

            </div>

          </Card>
        )
      )}

    </div>
  );
}
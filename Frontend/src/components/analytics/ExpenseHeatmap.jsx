import Card from "../ui/Card";

export default function ExpenseHeatmap({

  transactions,

}) {

  // TOP 5
  const sorted =
    [...transactions]

      .filter(
        (t) =>
          t.type === "expense"
      )

      .sort(
        (a, b) =>
          b.amount - a.amount
      )

      .slice(0, 5);

  return (

    <Card>

      <h2 className="text-2xl font-bold mb-6">

        Top Expenses

      </h2>

      <div className="space-y-5">

        {sorted.map((item) => (

          <div key={item._id}>

            <div className="flex justify-between mb-2">

              <p>{item.category}</p>

              <p>
                ₹{item.amount}
              </p>

            </div>

            <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">

              <div
                className="bg-red-500 h-4 rounded-full"
                style={{
                  width: `${
                    item.amount / 10
                  }%`,
                }}
              />

            </div>

          </div>
        ))}

      </div>

    </Card>
  );
}
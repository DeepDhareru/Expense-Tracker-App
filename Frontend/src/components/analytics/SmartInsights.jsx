import Card from "../ui/Card";

export default function SmartInsights({

  income,
  expense,
  category,

}) {

  const savings =
    income - expense;

  const topCategory =
    category[0]?._id || "N/A";

  return (

    <Card>

      <h2 className="text-2xl font-bold mb-6">

        Smart Insights

      </h2>

      <div className="space-y-5">

        {/* INSIGHT 1 */}
        <div className="bg-blue-50 p-4 rounded-2xl text-black">

          📊 Highest spending category:
          <strong>
            {" "}
            {topCategory}
          </strong>

        </div>

        {/* INSIGHT 2 */}
        <div className="bg-green-50 p-4 rounded-2xl text-black">

          💰 Your total savings:
          <strong>
            {" "}
            ₹{savings}
          </strong>

        </div>

        {/* INSIGHT 3 */}
        <div className="bg-yellow-50 p-4 rounded-2xl text-black">

          ⚡ Try reducing spending in high-expense categories.

        </div>

      </div>

    </Card>
  );
}
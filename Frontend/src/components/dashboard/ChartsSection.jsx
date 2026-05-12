import {
  Bar,
  Pie,
} from "react-chartjs-2";

import "chart.js/auto";

import Card from "../ui/Card";

export default function ChartsSection({
  monthly,
  category,
}) {

  // BAR CHART DATA
  const barData = {
    labels: monthly.map(
      (d) => `Month ${d._id}`
    ),

    datasets: [
      {
        label: "Expenses",
        data: monthly.map(
          (d) => d.total
        ),
        borderWidth: 1,
      },
    ],
  };

  // PIE CHART DATA
  const pieData = {
    labels: category.map(
      (d) => d._id
    ),

    datasets: [
      {
        data: category.map(
          (d) => d.total
        ),
        borderWidth: 1,
      },
    ],
  };

  return (

    <div className="grid md:grid-cols-2 gap-6 mt-8">

      {/* BAR CHART */}
      <Card className="h-[450px]">

        <h2 className="text-xl font-bold mb-6">
          Monthly Analytics
        </h2>

        <Bar
          data={barData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </Card>

      {/* PIE CHART */}
      <Card className="h-[450px]">

        <h2 className="text-xl font-bold mb-6">
          Expense Categories
        </h2>

        <Pie
          data={pieData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </Card>

    </div>
  );
}
import { Sparkles } from "lucide-react";

import Card from "../ui/Card";

export default function InsightsSection({
  insights,
}) {

  return (

    <Card className="mt-8">

      {/* TITLE */}
      <div className="flex items-center gap-2 mb-6">

        <Sparkles className="text-yellow-500" />

        <h2 className="text-2xl font-bold">
          AI Insights
        </h2>

      </div>

      {/* INSIGHTS */}
      <div className="space-y-4">

        {insights.map((item, index) => (

          <div
            key={index}
            className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 p-4 rounded-2xl text-black"
          >
            {item}
          </div>
        ))}

      </div>
    </Card>
  );
}
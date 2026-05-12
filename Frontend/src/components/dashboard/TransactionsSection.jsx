import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import API from "../../services/api";

import Card from "../ui/Card";

export default function TransactionsSection({
  transactions,
  refresh,
}) {

  const deleteTransaction = async (id) => {

    try {

      await API.delete(
        `/transactions/${id}`
      );

      refresh();

      toast.success(
        "Transaction Deleted"
      );

    } catch (err) {
      toast.error(
        "Failed to Delete Transaction"
      );
      console.log(err);
    }
  };

  return (

    <Card className="mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Recent Transactions
      </h2>

      <div className="space-y-4">

        {transactions.length > 0 ? (

  transactions.map((item) => (

    <div
        key={item._id}
        className="flex justify-between items-center border-b pb-4"
    >

      {/* LEFT */}
      <div>

        <h3 className="font-semibold text-lg">
          {item.category}
        </h3>

        <p className="text-gray-500 text-sm">
          {item.type}
        </p>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">

        <h2
          className={`font-bold text-lg ${
            item.type === "income"
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          ₹{item.amount}
        </h2>

        <button
          onClick={() =>
            deleteTransaction(item._id)
          }
          className="bg-red-100 hover:bg-red-200 p-2 rounded-xl"
        >
          <Trash2
            className="text-red-600"
            size={18}
          />
        </button>

      </div>
    </div>
  ))

) : (

  <div className="text-center py-10 text-gray-500">

    No Transactions Found

  </div>
)}

      </div>
    </Card>
  );
}
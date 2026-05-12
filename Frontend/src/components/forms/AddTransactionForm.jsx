import { useState } from "react";

import API from "../../services/api";

import Card from "../ui/Card";

import toast from "react-hot-toast";

export default function AddTransactionForm({
  refresh,
}) {

  // STATES
  const [amount, setAmount] =
    useState("");

  const [category, setCategory] =
    useState("Food");

  const [type, setType] =
    useState("expense");

  const [receipt, setReceipt] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // RECURRING STATES
  const [isRecurring, setIsRecurring] =
    useState(false);

  const [recurringType, setRecurringType] =
    useState("monthly");

  // CLOUDINARY UPLOAD
  const uploadImage = async (file) => {

    const data = new FormData();

    data.append("file", file);

    data.append(
      "upload_preset",
      "expense_tracker"
    );

    data.append(
      "cloud_name",
      "YOUR_CLOUD_NAME"
    );

    try {

      setLoading(true);

      const res = await fetch(

        "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",

        {
          method: "POST",
          body: data,
        }
      );

      const uploadedImage =
        await res.json();

      setReceipt(
        uploadedImage.secure_url
      );

      toast.success(
        "Receipt Uploaded Successfully"
      );

      setLoading(false);

    } catch (err) {

      console.log(err);

      toast.error(
        "Image Upload Failed"
      );

      setLoading(false);
    }
  };

  // SUBMIT
  const handleSubmit = async () => {

    if (!amount) {

      toast.error(
        "Please Enter Amount"
      );

      return;
    }

    try {

      setLoading(true);

      await API.post(
        "/transactions",
        {

          amount,
          category,
          type,
          receipt,

          isRecurring,

          recurringType,

        }
      );

      toast.success(
        "Transaction Added Successfully"
      );

      // RESET
      setAmount("");

      setCategory("Food");

      setType("expense");

      setReceipt("");

      setIsRecurring(false);

      setRecurringType("monthly");

      refresh();

      setLoading(false);

    } catch (err) {

      console.log(err);

      toast.error(
        "Failed To Add Transaction"
      );

      setLoading(false);
    }
  };

  return (

    <Card className="mt-8">

      {/* TITLE */}
      <div className="mb-6">

        <h2 className="text-2xl font-bold">

          Add Transaction

        </h2>

        <p className="text-gray-500 mt-1">

          Track your income and expenses

        </p>

      </div>

      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* AMOUNT */}
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) =>
            setAmount(
              e.target.value
            )
          }
          className="border p-3 rounded-xl outline-none"
        />

        {/* CATEGORY */}
        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
          className="border p-3 rounded-xl bg-white text-black"
        >

          <option value="Food">
            Food
          </option>

          <option value="Travel">
            Travel
          </option>

          <option value="Shopping">
            Shopping
          </option>

          <option value="Bills">
            Bills
          </option>

          <option value="Entertainment">
            Entertainment
          </option>

          <option value="Health">
            Health
          </option>

          <option value="Salary">
            Salary
          </option>

        </select>

        {/* TYPE */}
        <select
          value={type}
          onChange={(e) =>
            setType(
              e.target.value
            )
          }
          className="border p-3 rounded-xl bg-white text-black"
        >

          <option value="expense">
            Expense
          </option>

          <option value="income">
            Income
          </option>

        </select>

        {/* FILE */}
        <input
          type="file"
          accept="image/*"
          className="border p-3 rounded-xl"
          onChange={(e) =>
            uploadImage(
              e.target.files[0]
            )
          }
        />

      </div>

      {/* RECURRING */}
      <div className="mt-6">

        <div className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={isRecurring}
            onChange={(e) =>
              setIsRecurring(
                e.target.checked
              )
            }
          />

          <label className="font-medium">

            Recurring Transaction

          </label>

        </div>

        {/* RECURRING TYPE */}
        {isRecurring && (

          <select
            value={recurringType}
            onChange={(e) =>
              setRecurringType(
                e.target.value
              )
            }
            className="border p-3 rounded-xl bg-white text-black mt-4 w-full md:w-[250px]"
          >

            <option value="daily">
              Daily
            </option>

            <option value="weekly">
              Weekly
            </option>

            <option value="monthly">
              Monthly
            </option>

          </select>
        )}

      </div>

      {/* RECEIPT PREVIEW */}
      {receipt && (

        <div className="mt-6">

          <img
            src={receipt}
            alt="receipt"
            className="w-[200px] rounded-2xl shadow-md"
          />

        </div>
      )}

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white px-6 py-3 rounded-xl font-semibold transition"
      >

        {loading
          ? "Processing..."
          : "Add Transaction"}

      </button>

    </Card>
  );
}
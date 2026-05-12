import {
  Mail,
  Calendar,
  IndianRupee,
} from "lucide-react";

import Card from "../ui/Card";

export default function ProfileCard({

  user,
  income,
  expense,
  balance,

}) {

  return (

    <Card>

      {/* TOP */}
      <div className="flex flex-col items-center">

        {/* AVATAR */}
        <img
          src={`https://ui-avatars.com/api/?name=${user?.name}&background=6366f1&color=fff`}
          alt="avatar"
          className="w-28 h-28 rounded-full shadow-lg"
        />

        <h2 className="text-3xl font-bold mt-4">

          {user?.name}

        </h2>

        <div className="flex items-center gap-2 text-gray-500 mt-2">

          <Mail size={18} />

          {user?.email}

        </div>

        <div className="flex items-center gap-2 text-gray-500 mt-2">

          <Calendar size={18} />

          Joined Recently

        </div>

      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-4 mt-10">

        {/* INCOME */}
        <div className="bg-green-100 p-5 rounded-2xl text-center">

          <h3 className="text-gray-600">
            Income
          </h3>

          <p className="text-2xl font-bold text-green-600 mt-2">

            ₹{income}

          </p>

        </div>

        {/* EXPENSE */}
        <div className="bg-red-100 p-5 rounded-2xl text-center">

          <h3 className="text-gray-600">
            Expense
          </h3>

          <p className="text-2xl font-bold text-red-600 mt-2">

            ₹{expense}

          </p>

        </div>

        {/* BALANCE */}
        <div className="bg-blue-100 p-5 rounded-2xl text-center">

          <h3 className="text-gray-600">
            Balance
          </h3>

          <p className="text-2xl font-bold text-blue-600 mt-2">

            ₹{balance}

          </p>

        </div>

      </div>

    </Card>
  );
}
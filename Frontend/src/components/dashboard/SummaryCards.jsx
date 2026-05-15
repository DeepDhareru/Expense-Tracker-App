import Card from "../ui/Card";

import {

  Wallet,
  TrendingUp,
  TrendingDown,

} from "lucide-react";

import {

  useCurrency,

} from "../../context/CurrencyContext";

export default function SummaryCards({

  balance,
  income,
  expense,

}) {

  const {

    currency,
    symbols,
    convertAmount,

  } = useCurrency();

  return (

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* BALANCE */}
      <Card className="relative overflow-hidden bg-white dark:bg-gray-800">

        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full opacity-50" />

        <div className="relative z-10">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">

                Total Balance

              </p>

              <h2 className="text-3xl md:text-4xl font-bold mt-4">

                {
                  symbols[currency]
                }

                {
                  convertAmount(
                    balance
                  )
                }

              </h2>

            </div>

            <div className="bg-blue-100 p-4 rounded-2xl">

              <Wallet className="text-blue-600" />

            </div>

          </div>

        </div>

      </Card>

      {/* INCOME */}
      <Card className="relative overflow-hidden bg-white dark:bg-gray-800">

        <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-100 rounded-full opacity-50" />

        <div className="relative z-10">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">

                Total Income

              </p>

              <h2 className="text-3xl md:text-4xl font-bold mt-4 text-green-500">

                {
                  symbols[currency]
                }

                {
                  convertAmount(
                    income
                  )
                }

              </h2>

            </div>

            <div className="bg-green-100 p-4 rounded-2xl">

              <TrendingUp className="text-green-600" />

            </div>

          </div>

        </div>

      </Card>

      {/* EXPENSE */}
      <Card className="relative overflow-hidden bg-white dark:bg-gray-800">

        <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-100 rounded-full opacity-50" />

        <div className="relative z-10">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">

                Total Expenses

              </p>

              <h2 className="text-3xl md:text-4xl font-bold mt-4 text-red-500">

                {
                  symbols[currency]
                }

                {
                  convertAmount(
                    expense
                  )
                }

              </h2>

            </div>

            <div className="bg-red-100 p-4 rounded-2xl">

              <TrendingDown className="text-red-600" />

            </div>

          </div>

        </div>

      </Card>

    </div>
  );
}
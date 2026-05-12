import {
  LayoutDashboard,
  Wallet,
  BarChart3,
  Settings,
  User,
  BrainCircuit
} from "lucide-react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useTheme } from "../../context/ThemeContext";

export default function Sidebar() {

  const { darkMode } = useTheme();

  const navigate = useNavigate();

  const location = useLocation();

  // ACTIVE CLASS
  const menuClass = (path) => {

    return `w-full flex items-center gap-3 p-4 rounded-2xl transition cursor-pointer ${
      location.pathname === path

        ? "bg-blue-600 text-white"

        : darkMode
          ? "hover:bg-gray-700"
          : "hover:bg-gray-100"
    }`;
  };

  return (

    <div
      className={`w-[260px] min-h-screen p-6 ${
        darkMode
          ? "bg-gray-800 text-white"
          : "bg-white text-black"
      } shadow-lg`}
    >

      {/* LOGO */}
      <div className="mb-10">

        <h1 className="text-3xl font-bold">
          ExpenseAI
        </h1>

        <p
          className={`text-sm mt-1 ${
            darkMode
              ? "text-gray-300"
              : "text-gray-500"
          }`}
        >
          Smart Finance Tracker
        </p>

      </div>

      {/* MENU */}
      <div className="space-y-3">

        {/* DASHBOARD */}
        <button
          onClick={() =>
            navigate("/dashboard")
          }
          className={menuClass(
            "/dashboard"
          )}
        >

          <LayoutDashboard size={20} />

          Dashboard

        </button>

        {/* TRANSACTIONS */}
        <button
          onClick={() =>
            navigate("/transactions")
          }
          className={menuClass(
            "/transactions"
          )}
        >

          <Wallet size={20} />

          Transactions

        </button>

        {/* ANALYTICS */}
        <button
          onClick={() =>
            navigate("/analytics")
          }
          className={menuClass(
            "/analytics"
          )}
        >

          <BarChart3 size={20} />

          Analytics

        </button>

        {/* PROFILE */}
        <button
          onClick={() =>
            navigate("/profile")
          }
          className={menuClass(
            "/profile"
          )}
        >

          <User size={20} />

          Profile

        </button>

        {/* SETTINGS */}
        <button
          onClick={() =>
            navigate("/settings")
          }
          className={menuClass(
            "/settings"
          )}
        >

          <Settings size={20} />

          Settings

        </button>
        
        <button
  onClick={() => {
    navigate("/ai");
    setOpen(false);
  }}
  className={menuClass("/ai")}
>

  <BrainCircuit size={20} />

  AI Assistant

</button>
      </div>
    </div>
  );
}
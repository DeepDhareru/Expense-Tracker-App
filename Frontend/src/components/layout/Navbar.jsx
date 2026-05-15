import {

  Moon,
  Sun,
  LogOut,

} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

import CurrencySelector from "../ui/CurrencySelector";

export default function Navbar() {

  const {

    darkMode,
    toggleTheme,

  } = useTheme();

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    window.location.href = "/";
  };

  return (

    <div
      className={`flex items-center justify-end px-4 md:px-8 py-4 shadow-md sticky top-0 z-30 w-full overflow-x-hidden ${
        darkMode

          ? "bg-gray-800 text-white"

          : "bg-white text-black"
      }`}
    >

      {/* RIGHT */}
      <div className="flex items-center gap-2 md:gap-4 flex-wrap">

        {/* CURRENCY */}
        <CurrencySelector />

        {/* THEME */}
        <button
          onClick={toggleTheme}
          className={`p-2 md:p-3 rounded-2xl transition ${
            darkMode

              ? "bg-gray-700 hover:bg-gray-600"

              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >

          {darkMode

            ? <Sun size={20} />

            : <Moon size={20} />}

        </button>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white p-2 md:p-3 rounded-2xl transition"
        >

          <LogOut size={20} />

        </button>

      </div>

    </div>
  );
}
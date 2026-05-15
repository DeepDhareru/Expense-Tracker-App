import Sidebar from "../components/layout/Sidebar";

import Navbar from "../components/layout/Navbar";

import { Outlet } from "react-router-dom";

import { useTheme } from "../context/ThemeContext";

export default function MainLayout() {

  const { darkMode } =
    useTheme();

  return (

    <div
      className={`min-h-screen flex overflow-x-hidden ${
        darkMode

          ? "bg-gray-900 text-white"

          : "bg-gray-100 text-black"
      }`}
    >

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 md:ml-[260px] overflow-x-hidden">

        {/* NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <div className="p-4 md:p-8">

          <Outlet />

        </div>

      </div>

    </div>
  );
}
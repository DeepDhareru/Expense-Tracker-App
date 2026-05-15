import {

  LayoutDashboard,
  Receipt,
  BarChart3,
  Settings,
  BrainCircuit,
  Menu,
  X,

} from "lucide-react";

import {

  useNavigate,
  useLocation,

} from "react-router-dom";

import { useState } from "react";

import { useTheme } from "../../context/ThemeContext";

export default function Sidebar() {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const { darkMode } =
    useTheme();

  const [open, setOpen] =
    useState(false);

  // MENU CLASS
  const menuClass = (path) =>
    `flex items-center gap-3 p-4 rounded-2xl transition cursor-pointer ${
      location.pathname === path

        ? "bg-blue-600 text-white"

        : darkMode

          ? "hover:bg-gray-700"

          : "hover:bg-gray-200"
    }`;

  return (

    <>
      {/* MOBILE MENU */}
      <button
        onClick={() =>
          setOpen(!open)
        }
        className={`md:hidden fixed top-4 left-4 z-[60] p-3 rounded-xl shadow-lg ${
          darkMode

            ? "bg-gray-800 text-white"

            : "bg-white text-black"
        }`}
      >

        {open
          ? <X />
          : <Menu />}

      </button>

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-screen w-[260px] z-50 transform transition-transform duration-300 overflow-y-auto ${
          open

            ? "translate-x-0"

            : "-translate-x-full md:translate-x-0"
        } ${
          darkMode

            ? "bg-gray-800 text-white"

            : "bg-white text-black"
        } shadow-2xl`}
      >

        {/* LOGO */}
        <div className="p-6 border-b border-gray-700">

          <h1 className="text-3xl font-bold">

            ExpenseAI

          </h1>

          <p className="text-sm text-gray-400 mt-1">

            Smart Finance Tracker

          </p>

        </div>

        {/* MENU */}
        <div className="p-4 space-y-3">

          {/* DASHBOARD */}
          <div
            onClick={() => {
              navigate("/dashboard");
              setOpen(false);
            }}
            className={menuClass(
              "/dashboard"
            )}
          >

            <LayoutDashboard />

            Dashboard

          </div>

          {/* TRANSACTIONS */}
          <div
            onClick={() => {
              navigate("/transactions");
              setOpen(false);
            }}
            className={menuClass(
              "/transactions"
            )}
          >

            <Receipt />

            Transactions

          </div>

          {/* ANALYTICS */}
          <div
            onClick={() => {
              navigate("/analytics");
              setOpen(false);
            }}
            className={menuClass(
              "/analytics"
            )}
          >

            <BarChart3 />

            Analytics

          </div>

          {/* AI */}
          <div
            onClick={() => {
              navigate("/ai");
              setOpen(false);
            }}
            className={menuClass(
              "/ai"
            )}
          >

            <BrainCircuit />

            AI Assistant

          </div>

          {/* SETTINGS */}
          <div
            onClick={() => {
              navigate("/settings");
              setOpen(false);
            }}
            className={menuClass(
              "/settings"
            )}
          >

            <Settings />

            Settings

          </div>

        </div>

      </div>

      {/* OVERLAY */}
      {open && (

        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() =>
            setOpen(false)
          }
        />
      )}
    </>
  );
}
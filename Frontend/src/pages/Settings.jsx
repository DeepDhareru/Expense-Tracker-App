import { useState } from "react";

// import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import {
  User,
  Lock,
  Bell,
  Palette,
  Trash2,
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";

import toast from "react-hot-toast";

export default function Settings() {

  const { darkMode, toggleTheme } =
    useTheme();

  // STATES
  const [name, setName] =
    useState(
      JSON.parse(
        localStorage.getItem("user")
      )?.name || ""
    );

  const [email, setEmail] =
    useState(
      JSON.parse(
        localStorage.getItem("user")
      )?.email || ""
    );

  const [notifications, setNotifications] =
    useState(true);

  // SAVE PROFILE
  const saveProfile = () => {

    const updatedUser = {
      name,
      email,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    toast.success(
      "Profile Updated Successfully"
    );
  };

  // DELETE ACCOUNT
  const deleteAccount = () => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete your account?"
      );

    if (!confirmDelete) return;

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    toast.success(
      "Account Deleted"
    );

    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  return (

    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >

     

      <div className="flex">

        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <div className="flex-1 p-8">

          {/* PAGE HEADER */}
          <div className="mb-8">

            <h1 className="text-4xl font-bold">
              Settings
            </h1>

            <p
              className={`mt-2 ${
                darkMode
                  ? "text-gray-300"
                  : "text-gray-500"
              }`}
            >
              Manage your account preferences
            </p>

          </div>

          {/* PROFILE SETTINGS */}
          <Card className="mb-8">

            <div className="flex items-center gap-3 mb-6">

              <User className="text-blue-500" />

              <h2 className="text-2xl font-bold">
                Profile Settings
              </h2>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              {/* NAME */}
              <div>

                <label className="block mb-2 text-sm font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className={`w-full p-3 rounded-xl border outline-none ${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white"
                  }`}
                />

              </div>

              {/* EMAIL */}
              <div>

                <label className="block mb-2 text-sm font-medium">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className={`w-full p-3 rounded-xl border outline-none ${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white"
                  }`}
                />

              </div>

            </div>

            <Button
              onClick={saveProfile}
              className="mt-6"
            >
              Save Changes
            </Button>

          </Card>

          {/* APPEARANCE */}
          <Card className="mb-8">

            <div className="flex items-center gap-3 mb-6">

              <Palette className="text-purple-500" />

              <h2 className="text-2xl font-bold">
                Appearance
              </h2>

            </div>

            <div className="flex items-center justify-between">

              <div>

                <h3 className="font-semibold">
                  Dark Mode
                </h3>

                <p
                  className={`text-sm mt-1 ${
                    darkMode
                      ? "text-gray-300"
                      : "text-gray-500"
                  }`}
                >
                  Toggle between light and dark theme
                </p>

              </div>

              <button
                onClick={toggleTheme}
                className={`w-16 h-8 rounded-full transition flex items-center px-1 ${
                  darkMode
                    ? "bg-blue-600 justify-end"
                    : "bg-gray-300 justify-start"
                }`}
              >

                <div className="w-6 h-6 bg-white rounded-full" />

              </button>

            </div>

          </Card>

          {/* NOTIFICATIONS */}
          <Card className="mb-8">

            <div className="flex items-center gap-3 mb-6">

              <Bell className="text-yellow-500" />

              <h2 className="text-2xl font-bold">
                Notifications
              </h2>

            </div>

            <div className="flex items-center justify-between">

              <div>

                <h3 className="font-semibold">
                  Email Notifications
                </h3>

                <p
                  className={`text-sm mt-1 ${
                    darkMode
                      ? "text-gray-300"
                      : "text-gray-500"
                  }`}
                >
                  Receive updates and alerts
                </p>

              </div>

              <button
                onClick={() =>
                  setNotifications(
                    !notifications
                  )
                }
                className={`w-16 h-8 rounded-full transition flex items-center px-1 ${
                  notifications
                    ? "bg-green-500 justify-end"
                    : "bg-gray-300 justify-start"
                }`}
              >

                <div className="w-6 h-6 bg-white rounded-full" />

              </button>

            </div>

          </Card>

          {/* SECURITY */}
          <Card className="mb-8">

            <div className="flex items-center gap-3 mb-6">

              <Lock className="text-green-500" />

              <h2 className="text-2xl font-bold">
                Security
              </h2>

            </div>

            <Button>
              Change Password
            </Button>

          </Card>

          {/* DELETE ACCOUNT */}
          <Card>

            <div className="flex items-center gap-3 mb-6">

              <Trash2 className="text-red-500" />

              <h2 className="text-2xl font-bold">
                Danger Zone
              </h2>

            </div>

            <p
              className={`mb-6 ${
                darkMode
                  ? "text-gray-300"
                  : "text-gray-500"
              }`}
            >
              Permanently delete your account and all associated data.
            </p>

            <button
              onClick={deleteAccount}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Delete Account
            </button>

          </Card>

        </div>
      </div>
    </div>
  );
}
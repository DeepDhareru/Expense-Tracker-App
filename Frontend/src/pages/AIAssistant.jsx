import { useState } from "react";

import API from "../services/api";

// import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

import Card from "../components/ui/Card";

import {
  Bot,
  Send,
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";

export default function AIAssistant() {

  const { darkMode } = useTheme();

  const [message, setMessage] =
    useState("");

  const [reply, setReply] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // SEND MESSAGE
  const sendMessage = async () => {

    if (!message) return;

    try {

      setLoading(true);

      const res =
        await API.post(
          "/ai/chat",
          { message }
        );

      setReply(res.data.reply);

      setLoading(false);

    } catch (err) {

      console.log(err);

      setLoading(false);
    }
  };

  return (

    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >

    

      <div className="flex flex-col md:flex-row">

        <Sidebar />

        {/* CONTENT */}
        <div className="flex-1 p-4 md:p-8">

          {/* TITLE */}
          <div className="mb-8">

            <h1 className="text-4xl font-bold">

              AI Financial Assistant

            </h1>

            <p
              className={`mt-2 ${
                darkMode
                  ? "text-gray-300"
                  : "text-gray-500"
              }`}
            >

              Get AI-powered financial insights and spending analysis

            </p>

          </div>

          {/* CHAT CARD */}
          <Card>

            {/* INPUT */}
            <div className="flex gap-4">

              <input
                type="text"
                placeholder="Ask AI about your finances..."
                value={message}
                onChange={(e) =>
                  setMessage(
                    e.target.value
                  )
                }
                className={`flex-1 p-4 rounded-2xl border outline-none ${
                  darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white"
                }`}
              />

              <button
                onClick={sendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-2xl"
              >

                <Send />

              </button>

            </div>

            {/* AI RESPONSE */}
            <div className="mt-8">

              <div className="flex items-center gap-3 mb-4">

                <div className="bg-blue-100 p-3 rounded-full">

                  <Bot className="text-blue-600" />

                </div>

                <h2 className="text-2xl font-bold">

                  AI Response

                </h2>

              </div>

              <div
                className={`p-6 rounded-2xl whitespace-pre-wrap ${
                  darkMode
                    ? "bg-gray-800"
                    : "bg-gray-50"
                }`}
              >

                {loading

                  ? "AI is analyzing your finances..."

                  : reply ||

                    "Ask something like: Where am I overspending?"}

              </div>

            </div>

          </Card>

        </div>

      </div>

    </div>
  );
}
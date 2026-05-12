import { useState } from "react";

import API from "../services/api";

import Button from "../components/ui/Button";

import toast from "react-hot-toast";

export default function Auth() {

  // LOGIN / REGISTER TOGGLE
  const [isLogin, setIsLogin] =
    useState(true);

  // FORM STATES
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  // OTP STATES
  const [otp, setOtp] =
    useState("");

  const [otpSent, setOtpSent] =
    useState(false);

  // LOADING
  const [loading, setLoading] =
    useState(false);

  // LOGIN
  const handleLogin = async () => {

    try {

      setLoading(true);

      const res = await API.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        res.data.token
      );

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(
          res.data.user
        )
      );

      toast.success(
        "Login Successful 🚀"
      );

      setLoading(false);

      // REDIRECT
      window.location.href =
        "/dashboard";

    } catch (err) {

      setLoading(false);

      toast.error(
        err.response?.data?.msg ||
          "Login Failed"
      );
    }
  };

  // SEND OTP
  const sendOTP = async () => {

    try {

      setLoading(true);

      await API.post(
        "/otp/send",
        {
          email,
        }
      );

      toast.success(
        "OTP Sent To Email 📩"
      );

      setOtpSent(true);

      setLoading(false);

    } catch (err) {

      setLoading(false);

      toast.error(
        "Failed To Send OTP"
      );
    }
  };

  // REGISTER
  const handleRegister = async () => {

    try {

      setLoading(true);

      // VERIFY OTP
      await API.post(
        "/otp/verify",
        {
          email,
          otp,
        }
      );

      // REGISTER USER
      await API.post(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      );

      toast.success(
        "Registration Successful 🎉"
      );

      setLoading(false);

      // RESET
      setOtpSent(false);

      setName("");
      setEmail("");
      setPassword("");
      setOtp("");

      // LOGIN PAGE
      setIsLogin(true);

    } catch (err) {

      setLoading(false);

      toast.error(
        err.response?.data?.msg ||
          "Registration Failed"
      );
    }
  };

  return (

    <div className="min-h-screen flex">

      {/* LEFT SECTION */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 text-white items-center justify-center p-10">

        <div>

          <h1 className="text-5xl font-bold leading-tight">

            Smart Expense <br />

            Tracker

          </h1>

          <p className="mt-6 text-lg text-gray-200">

            Track your expenses,
            analyze spending patterns,
            and get AI-powered
            financial insights.

          </p>

          {/* FEATURES */}
          <div className="mt-10 space-y-4">

            <div className="bg-white/10 p-4 rounded-xl backdrop-blur">

              📊 Advanced Analytics

            </div>

            <div className="bg-white/10 p-4 rounded-xl backdrop-blur">

              🔐 OTP Email Verification

            </div>

            <div className="bg-white/10 p-4 rounded-xl backdrop-blur">

              ⚡ Redis Powered Backend

            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SECTION */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-6">

        <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">

          {/* TITLE */}
          <div className="text-center">

            <h2 className="text-4xl font-bold text-gray-800">

              {isLogin

                ? "Welcome Back 👋"

                : "Create Account 🚀"}

            </h2>

            <p className="text-gray-500 mt-2">

              {isLogin

                ? "Login to continue"

                : "Register with OTP verification"}

            </p>

          </div>

          {/* FORM */}
          <div className="mt-8">

            {/* NAME */}
            {!isLogin && (

              <div className="mb-5">

                <label className="text-sm text-gray-600">

                  Full Name

                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                  className="w-full mt-2 border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>
            )}

            {/* EMAIL */}
            <div className="mb-5">

              <label className="text-sm text-gray-600">

                Email Address

              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className="w-full mt-2 border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* PASSWORD */}
            <div className="mb-5">

              <label className="text-sm text-gray-600">

                Password

              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="w-full mt-2 border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-500"
              />

            </div>

            {/* OTP */}
            {!isLogin && otpSent && (

              <div className="mb-6">

                <label className="text-sm text-gray-600">

                  Enter OTP

                </label>

                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) =>
                    setOtp(
                      e.target.value
                    )
                  }
                  className="w-full mt-2 border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
                />

              </div>
            )}

            {/* BUTTONS */}
            {!isLogin && !otpSent ? (

              <Button
                onClick={sendOTP}
                className="w-full"
              >

                {loading
                  ? "Sending OTP..."
                  : "Send OTP"}

              </Button>

            ) : (

              <Button
                onClick={
                  isLogin
                    ? handleLogin
                    : handleRegister
                }
                className="w-full"
              >

                {loading

                  ? "Please Wait..."

                  : isLogin
                    ? "Login"
                    : "Verify & Register"}

              </Button>
            )}

            {/* TOGGLE */}
            <div className="text-center mt-6 text-gray-500">

              {isLogin

                ? "Don't have an account?"

                : "Already have an account?"}

              <button
                onClick={() => {

                  setIsLogin(
                    !isLogin
                  );

                  setOtpSent(false);
                }}
                className="text-blue-600 font-semibold ml-2"
              >

                {isLogin
                  ? "Register"
                  : "Login"}

              </button>

            </div>

            {/* FOOTER */}
            <div className="text-center mt-6 text-sm text-gray-400">

              Built with React + Node + Redis 🚀

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
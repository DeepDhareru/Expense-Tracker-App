import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Auth from "./pages/Auth";

import Dashboard from "./pages/Dashboard";

import Profile from "./pages/Profile";

import Transactions from "./pages/Transactions";

import Analytics from "./pages/Analytics";

import Settings from "./pages/Settings";

import AIAssistant from "./pages/AIAssistant";

function App() {

  const isAuth =
    localStorage.getItem("token");

  return (

    <BrowserRouter>

      <Routes>

        {/* AUTH */}
        <Route
          path="/"
          element={<Auth />}
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            isAuth
              ? <Dashboard />
              : <Auth />
          }
        />

        {/* PROFILE */}
        <Route
          path="/profile"
          element={
            isAuth
              ? <Profile />
              : <Auth />
          }
        />

        {/* TRANSACTIONS */}
        <Route
          path="/transactions"
          element={
            isAuth
              ? <Transactions />
              : <Auth />
          }
        />

        {/* ANALYTICS */}
        <Route
          path="/analytics"
          element={
            isAuth
              ? <Analytics />
              : <Auth />
          }
        />

        {/* SETTINGS */}
        <Route
          path="/settings"
          element={
            isAuth
              ? <Settings />
              : <Auth />
          }
        />

        <Route
          path="/ai"
          element={
            isAuth
            ? <AIAssistant />
            : <Auth />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
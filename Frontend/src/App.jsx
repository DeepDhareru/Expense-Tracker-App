import {

  BrowserRouter,
  Routes,
  Route,
  Navigate,

} from "react-router-dom";

import Auth from "./pages/Auth";

import Dashboard from "./pages/Dashboard";

import Transactions from "./pages/Transactions";

import Analytics from "./pages/Analytics";

import Settings from "./pages/Settings";

import AIAssistant from "./pages/AIAssistant";

import MainLayout from "./layout/MainLayout";

// PROTECTED ROUTE
const ProtectedRoute = ({
  children,
}) => {

  const token =
    localStorage.getItem(
      "token"
    );

  return token

    ? children

    : <Navigate to="/" />;
};

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* AUTH */}
        <Route
          path="/"
          element={<Auth />}
        />

        {/* MAIN LAYOUT */}
        <Route
          element={
            <ProtectedRoute>

              <MainLayout />

            </ProtectedRoute>
          }
        >

          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* TRANSACTIONS */}
          <Route
            path="/transactions"
            element={<Transactions />}
          />

          {/* ANALYTICS */}
          <Route
            path="/analytics"
            element={<Analytics />}
          />

          {/* SETTINGS */}
          <Route
            path="/settings"
            element={<Settings />}
          />

          {/* AI ASSISTANT */}
          <Route
            path="/ai"
            element={<AIAssistant />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}
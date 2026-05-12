import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";

import { ThemeProvider } from "./context/ThemeContext";
import { CurrencyProvider,} from "./context/CurrencyContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <ThemeProvider>
      <CurrencyProvider>
        <App />
        <Toaster position="top-right" reverseOrder={false}/>
      </CurrencyProvider>
    </ThemeProvider>

  </React.StrictMode>
);
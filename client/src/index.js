import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext"; // ✅ import it

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>        {/* ✅ wrap the whole app */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);

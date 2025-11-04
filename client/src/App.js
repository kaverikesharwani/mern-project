import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import your pages & components
import Home from "./pages/Home";            // (you can make a simple one)
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Fallback for undefined routes */}
        <Route path="*" element={<h2>404 Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import RegisterPage from "./pages/Register";
import SignInPage from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer"; 
import "./index.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
      </Routes>
      <Footer />
    </>
  );
}

export default App;

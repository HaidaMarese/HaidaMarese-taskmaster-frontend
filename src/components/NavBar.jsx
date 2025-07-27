import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("social-app-token");

  const handleLogout = () => {
    localStorage.removeItem("social-app-token");
    navigate("/signin");
  };

  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center bg-gray-900 text-white fixed top-0 z-50 shadow-md">
      <h1 className="text-2xl font-bold tracking-tight">TaskMaster</h1>
      <div className="flex gap-6">
        <NavLink to="/" className="hover:underline">Home</NavLink>
        {isLoggedIn ? (
          <>
            <NavLink to="/dashboard" className="hover:underline">Dashboard</NavLink>
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/register" className="hover:underline">Register</NavLink>
            <NavLink to="/signin" className="hover:underline">Sign In</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;

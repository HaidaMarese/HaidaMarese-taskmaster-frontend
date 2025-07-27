import React from "react";
import { useState } from "react";
import { backendClient } from "../Clients/backendClient";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await backendClient.post("/users/register", formData);
      localStorage.setItem("TaskMaster-app-token", JSON.stringify(res.data.token));
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Registration failed. Email may already exist.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 pt-20 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>
        {error && (
          <p className="text-red-500 bg-red-100 p-2 rounded">{error}</p>
        )}
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    </main>
  );
}

export default RegisterPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { readLS, writeLS, LS } from "../utils/localStorageUtils";
import { toast } from "react-toastify";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default role

  const handleSignup = (e) => {
    e.preventDefault();

    const users = readLS(LS.USERS, []);

    // Check if user already exists
    const userExists = users.some((u) => u.username === username);
    if (userExists) {
      toast.error("⚠️ User already exists!");
      return;
    }

    const newUser = { name, username, password, role };
    const updatedUsers = [...users, newUser];

    writeLS(LS.USERS, updatedUsers);
    writeLS(LS.SESSION, { username, role }); // Set session

    toast.success("✅ Signup successful! Redirecting...");
    setTimeout(() => {
      navigate(role === "admin" ? "/admin-dashboard" : "/user-dashboard");
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-center text-indigo-600">
        Signup
      </h2>

      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        {/* Role Selection */}
        <div>
          <label className="block mb-1 font-medium">Role</label>
          <div className="flex gap-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="user"
                checked={role === "user"}
                onChange={() => setRole("user")}
              />
              <span className="ml-2">User</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={() => setRole("admin")}
              />
              <span className="ml-2">Admin</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

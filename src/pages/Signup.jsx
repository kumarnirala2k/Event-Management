import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { readLS, writeLS, LS } from "../utils/localStorageUtils";

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
      alert("User already exists!");
      return;
    }

    const newUser = { name,username, password, role };
    const updatedUsers = [...users, newUser];

    writeLS(LS.USERS, updatedUsers);
    writeLS(LS.SESSION, { username, role }); // Set session

    navigate(role === "admin" ? "/admin-dashboard" : "/user-dashboard");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Signup</h2>
      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input 
            className="w-full border px-3 py-2 rounded"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

        </div>
        <div>
          

          <label className="block mb-1">Username</label>
          <input
            className="w-full border px-3 py-2 rounded"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            className="w-full border px-3 py-2 rounded"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* ✅ Role Selection */}
        <div>
          <label className="block mb-1">Role</label>
          <div className="flex gap-4">
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
          className="w-full bg-indigo-600 text-white py-2 rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

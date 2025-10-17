import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { readLS, writeLS, LS } from "../utils/localStorageUtils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role

  const handleLogin = (e) => {
    e.preventDefault();

    const users = readLS(LS.USERS, []);

    const user = users.find(
      (u) => u.username === username && u.password === password && u.role === role
    );

    if (!user) {
      toast.error("❌ Invalid username, password, or role!", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    // Save session
    writeLS(LS.SESSION, { username: user.username, role: user.role });

    toast.success(`✅ Welcome ${user.username}! Redirecting...`, {
      position: "top-right",
      autoClose: 1500,
    });

    setTimeout(() => {
      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1">Username</label>
          <input
            type="text"
            required
            className="w-full border px-3 py-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            required
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* ✅ Role Selection */}
        <div>
          <label className="block mb-1">Login as:</label>
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
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Login
        </button>
      </form>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

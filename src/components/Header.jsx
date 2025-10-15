import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutModal from "./LogoutModal";
import { getSession, clearSession } from "../utils/session";

export default function Header() {
  const session = getSession();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => setShowLogout(true);
  const confirmLogout = () => {
    clearSession();
    setShowLogout(false);
    navigate("/");
  };
  const cancelLogout = () => setShowLogout(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">
            EM
          </div>
          <div className="text-lg font-semibold">Event Management</div>
        </Link>

        <nav className="flex items-center gap-3">
          <Link to="/events" className="text-sm px-3 py-2 rounded hover:bg-gray-100">
            Events
          </Link>

          {session && (
            <Link
              to={session.role === "admin" ? "/admin-dashboard" : "/user-dashboard"}
              className="text-sm px-3 py-2 rounded hover:bg-gray-100"
            >
              Dashboard
            </Link>
          )}

          {session ? (
            <button
              onClick={handleLogout}
              className="text-sm px-3 py-2 rounded border text-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm px-3 py-2 rounded hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-sm px-3 py-2 rounded hover:bg-gray-100"
              >
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>

      <LogoutModal
        show={showLogout}
        onCancel={cancelLogout}
        onConfirm={confirmLogout}
      />
    </header>
  );
}

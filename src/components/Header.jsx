import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getSession, clearSession } from "../utils/session";
import LogoutModal from "./LogoutModal";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // for mobile toggle icons

export default function Header() {
  const session = getSession();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => setShowLogout(true);
  const confirmLogout = () => {
    clearSession();
    setShowLogout(false);
    navigate("/");
  };
  const cancelLogout = () => setShowLogout(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="w-10 h-10 rounded-lg bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold"
          >
            EM
          </motion.div>
          <motion.div
            className="text-lg font-semibold"
            whileHover={{ scale: 1.05 }}
          >
            Event Management
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-3">
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleLogout}
              className="text-sm px-3 py-2 rounded border border-red-400 text-red-600 hover:bg-red-50"
            >
              Logout
            </motion.button>
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

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden flex items-center text-gray-700"
          onClick={toggleMenu}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-inner overflow-hidden"
          >
            <div className="flex flex-col items-center gap-3 py-4">
              <Link
                to="/events"
                onClick={() => setMenuOpen(false)}
                className="text-sm px-3 py-2 rounded hover:bg-gray-100 w-full text-center"
              >
                Events
              </Link>

              {session && (
                <Link
                  to={session.role === "admin" ? "/admin-dashboard" : "/user-dashboard"}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm px-3 py-2 rounded hover:bg-gray-100 w-full text-center"
                >
                  Dashboard
                </Link>
              )}

              {session ? (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="text-sm px-3 py-2 rounded border border-red-400 text-red-600 hover:bg-red-50 w-40"
                >
                  Logout
                </motion.button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="text-sm px-3 py-2 rounded hover:bg-gray-100 w-full text-center"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="text-sm px-3 py-2 rounded hover:bg-gray-100 w-full text-center"
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Logout Modal */}
      <LogoutModal
        show={showLogout}
        onCancel={cancelLogout}
        onConfirm={confirmLogout}
      />
    </header>
  );
}

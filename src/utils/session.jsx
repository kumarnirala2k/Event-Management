import React from "react";
import { Navigate } from "react-router-dom";
import { readLS, LS } from "./localStorageUtils";

// ✅ Get currently logged-in user session
export const getSession = () => {
  return readLS(LS.SESSION, null);
};

// ✅ Save new session
export const setSession = (user) => {
  localStorage.setItem(LS.SESSION, JSON.stringify(user));
};

// ✅ Clear current session
export const clearSession = () => {
  localStorage.removeItem(LS.SESSION);
};

// ✅ RequireAuth: Only logged-in users can access
export function RequireAuth({ children }) {
  const session = getSession();
  return session ? children : <Navigate to="/login" replace />;
}

// ✅ RequireAdmin: Only admin role can access
export function RequireAdmin({ children }) {
  const session = getSession();
  return session && session.role === "admin"
    ? children
    : <Navigate to="/login" replace />;
}

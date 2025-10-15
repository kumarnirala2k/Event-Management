import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import ManageEvents from "./pages/ManageEvents";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

import { RequireAuth, RequireAdmin } from "./utils/session";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} />

            {/* Protected Routes */}
            <Route
              path="/create"
              element={
                <RequireAuth>
                  <CreateEvent />
                </RequireAuth>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <RequireAuth>
                  <EditEvent />
                </RequireAuth>
              }
            />
            <Route
              path="/manage-events"
              element={
                <RequireAuth>
                  <ManageEvents />
                </RequireAuth>
              }
            />
            <Route
              path="/manage-events/:id"
              element={
                <RequireAdmin>
                  <EditEvent />
                </RequireAdmin>
              }
            />
            <Route
              path="/user-dashboard"
              element={
                <RequireAuth>
                  <UserDashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <RequireAdmin>
                  <AdminDashboard />
                </RequireAdmin>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

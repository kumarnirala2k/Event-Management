import React, { useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { readLS, LS } from "../utils/localStorageUtils";
import { getSession } from "../utils/session";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const session = getSession();
  const users = readLS(LS.USERS, []);
  const events = readLS(LS.EVENTS, []);

  // Redirect non-admins
  useEffect(() => {
    if (!session || session.role !== "admin") {
      navigate("/login"); // or navigate("/") for homepage
    }
  }, [session, navigate]);

  // Memoized filtered data
  const approved = useMemo(() => events.filter((e) => e?.approved), [events]);
  const pending = useMemo(() => events.filter((e) => !e?.approved), [events]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        Welcome, {session?.username} (Admin)
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-2xl font-bold">{users.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow">
          <p className="text-sm text-gray-500">Total Events</p>
          <p className="text-2xl font-bold">{events.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow">
          <p className="text-sm text-gray-500">Pending Approvals</p>
          <p className="text-2xl font-bold text-red-600">{pending.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <h3 className="font-semibold mb-3">Pending Events</h3>
        {pending.length === 0 ? (
          <p className="text-gray-500">No pending events.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {pending.map((e) => (
              <li
                key={e?.id || Math.random()}
                className="py-2 flex justify-between items-center"
              >
                <span>{e?.title || "Untitled Event"}</span>
                <Link
                  to={`/manage-events/${e?.id}`} // Dynamic link
                  className="text-indigo-600 text-sm hover:underline"
                >
                  Review
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex gap-3">
        <Link
          to="/manage-events"
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Manage Events
        </Link>
      </div>
    </div>
  );
}

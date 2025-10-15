import React from "react";
import { Link } from "react-router-dom";
import { readLS, writeLS, LS } from "../utils/localStorageUtils";
import { getSession } from "../utils/session";

export default function ManageEvents() {
  const session = getSession();
  if (!session) return <p className="text-center p-6">Login required</p>;

  const events = readLS(LS.EVENTS, []);
  const filtered =
    session.role === "admin"
      ? events
      : events.filter((e) => e.creatorId === session.id);

  const handleDelete = (id) => {
    const updated = events.filter((e) => e.id !== id);
    writeLS(LS.EVENTS, updated);
    alert("Event deleted.");
    window.location.reload();
  };

  const handleApprove = (id) => {
    const updated = events.map((e) =>
      e.id === id ? { ...e, approved: true } : e
    );
    writeLS(LS.EVENTS, updated);
    alert("Event approved!");
    window.location.reload();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Events</h2>
      {filtered.length === 0 && (
        <p className="text-gray-500">No events found.</p>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((e) => (
          <div key={e.id} className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold text-lg">{e.title}</h3>
            <p className="text-sm text-gray-600">{e.date}</p>
            <p className="text-gray-500 mt-2 line-clamp-2">{e.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                to={`/edit/${e.id}`}
                className="px-3 py-1 bg-indigo-500 text-white rounded text-sm"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(e.id)}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm"
              >
                Delete
              </button>
              {session.role === "admin" && !e.approved && (
                <button
                  onClick={() => handleApprove(e.id)}
                  className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                >
                  Approve
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

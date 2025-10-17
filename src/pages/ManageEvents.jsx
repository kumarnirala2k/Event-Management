import React from "react";
import { Link } from "react-router-dom";
import { readLS, writeLS, LS } from "../utils/localStorageUtils";
import { getSession } from "../utils/session";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ManageEvents() {
  const session = getSession();
  if (!session) return <p className="text-center p-6">Login required</p>;

  const events = readLS(LS.EVENTS, []);
  const filtered =
    session.role === "admin"
      ? events
      : events.filter((e) => e.creatorId === session.id);

  // ✅ Delete event
  const handleDelete = (id) => {
  // Step 1: Show confirmation popup
  if (window.confirm("Are you sure you want to delete this event?")) {
    const updated = events.filter((e) => e.id !== id);
    writeLS(LS.EVENTS, updated);

    // Step 2: Show success toast after delete
    toast.success("🗑️ Event deleted successfully!", {
      position: "top-right",
      autoClose: 1500,
    });

    // Step 3: Refresh the page after short delay
    setTimeout(() => window.location.reload(), 1500);
  } else {
    // Optional: Show info toast if user cancels
    toast.info("❌ Delete canceled.", {
      position: "top-right",
      autoClose: 1500,
    });
  }
};


  // ✅ Approve event (Admin only)
  const handleApprove = (id) => {
    const updated = events.map((e) =>
      e.id === id ? { ...e, approved: true } : e
    );
    writeLS(LS.EVENTS, updated);

    toast.success("✅ Event approved successfully!", {
      position: "top-right",
      autoClose: 1500,
    });

    setTimeout(() => window.location.reload(), 1500);
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
            <img src={e.image} alt="" className="h-48 w-full object-fill p-2" />
            <h3 className="font-semibold text-lg text-blue-700">{e.title}</h3>

            <div className="flex justify-between items-center pr-10">
              <p className="text-sm text-gray-600">
                <span className="font-bold">Date: </span>
                {e.date}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Time: </span>
                {e.time}
              </p>
            </div>

            <p className="text-gray-500 mt-2 line-clamp-2">{e.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {e.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs bg-indigo-100 text-indigo-700 rounded-full px-2 py-1"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                to={`/edit/${e.id}`}
                className="px-3 py-1 bg-indigo-500 text-white rounded text-sm hover:bg-indigo-600"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(e.id)}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
              >
                Delete
              </button>

              {session.role === "admin" && !e.approved && (
                <button
                  onClick={() => handleApprove(e.id)}
                  className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                >
                  Approve
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Toast Container for Notifications */}
      <ToastContainer />
    </div>
  );
}

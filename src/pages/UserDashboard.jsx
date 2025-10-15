import React from "react";
import { Link } from "react-router-dom";
import { readLS, LS } from "../utils/localStorageUtils";
import { getSession } from "../utils/session";

export default function UserDashboard() {
  const session = getSession();
  const events = readLS(LS.EVENTS, []);
  const myEvents = events.filter((e) => e.creatorId === session?.id);

  if (!session)
    return <p className="text-center p-6">Please log in to view your dashboard.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        Welcome, {session.username} 👋
      </h2>
      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="font-semibold mb-3">Your Events</h3>
        {myEvents.length === 0 ? (
          <p className="text-gray-500">You haven’t created any events yet.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {myEvents.map((e) => (
              <li key={e.id} className="py-2 flex justify-between items-center">
                <div>
                  <p className="font-medium">{e.title}</p>
                  <p className="text-sm text-gray-500">{e.date}</p>
                </div>
                <Link
                  to={`/edit/${e.id}`}
                  className="text-indigo-600 text-sm hover:underline"
                >
                  Edit
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6 flex gap-3">
        <Link
          to="/create"
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Create Event
        </Link>
        <Link
          to="/manage-events"
          className="px-4 py-2 border rounded"
        >
          Manage My Events
        </Link>
      </div>
    </div>
  );
}

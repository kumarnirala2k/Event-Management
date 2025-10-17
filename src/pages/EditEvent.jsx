import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readLS, writeLS, LS } from "../utils/localStorageUtils";
import { getSession } from "../utils/session";
import { toast } from "react-toastify";

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const session = getSession();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const events = readLS(LS.EVENTS, []);
    const found = events.find((e) => e.id === id);
    if (found) {
      found.tags = (found.tags || []).join(", ");
      setEvent(found);
    } else {
      toast.error("Event not found!");
    }
  }, [id]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setEvent((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!event) return;
    const { title, date, time, description, location, image, category, tags } = event;

    if (!title || !date || !time || !description || !location || !image || !category) {
      toast.error("⚠️ All fields are required!");
      return;
    }

    const updatedEvent = {
      ...event,
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
    };

    const events = readLS(LS.EVENTS, []);
    const idx = events.findIndex((e) => e.id === updatedEvent.id);
    if (idx === -1) {
      toast.error("❌ Event not found!");
      return;
    }

    events[idx] = updatedEvent;
    writeLS(LS.EVENTS, events);

    toast.success("✅ Event updated successfully!");
    setTimeout(() => navigate("/manage-events"), 1500);
  };

  if (!session) return <p className="text-center p-6">Login required</p>;
  if (!event) return <p className="text-center p-6">Event not found</p>;

  const canEdit = session.role === "admin" || session.id === event.creatorId;
  if (!canEdit)
    return (
      <p className="text-center p-6">
        You don't have permission to edit this event.
      </p>
    );

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow mt-8">
      <h2 className="text-2xl font-semibold mb-4">Edit Event</h2>

      <input
        value={event.title}
        onChange={(e) => setEvent({ ...event, title: e.target.value })}
        placeholder="Event Title"
        className="w-full border rounded px-3 py-2 mb-3"
      />

      <input
        value={event.date}
        onChange={(e) => setEvent({ ...event, date: e.target.value })}
        type="date"
        className="w-full border rounded px-3 py-2 mb-3"
      />
      <input
        value={event.time}
        onChange={(e) => setEvent({ ...event, time: e.target.value })}
        type="time"
        className="w-full border rounded px-3 py-2 mb-3"
      />

      <input
        value={event.location}
        onChange={(e) => setEvent({ ...event, location: e.target.value })}
        placeholder="Location"
        className="w-full border rounded px-3 py-2 mb-3"
      />

      {/* Image Upload */}
      <div className="mb-3">
        <label className="block mb-1 text-sm font-medium">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full border rounded px-3 py-2"
        />
        {event.image && (
          <img
            src={event.image}
            alt="Preview"
            className="mt-3 w-full rounded-lg shadow"
          />
        )}
      </div>

      <textarea
        value={event.description}
        onChange={(e) => setEvent({ ...event, description: e.target.value })}
        placeholder="Description"
        className="w-full border rounded px-3 py-2 mb-3"
      />

      <select
        value={event.category}
        onChange={(e) => setEvent({ ...event, category: e.target.value })}
        className="w-full border rounded px-3 py-2 mb-3"
      >
        <option value="">Select Category</option>
        <option value="Conference">Conference</option>
        <option value="Workshop">Workshop</option>
        <option value="Meetup">Meetup</option>
        <option value="Webinar">Webinar</option>
      </select>

      <input
        value={event.tags}
        onChange={(e) => setEvent({ ...event, tags: e.target.value })}
        placeholder="Tags (comma-separated)"
        className="w-full border rounded px-3 py-2 mb-4"
      />

      <button
        onClick={handleSave}
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
      >
        Save Changes
      </button>
    </div>
  );
}

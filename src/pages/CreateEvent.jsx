import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { readLS, writeLS, LS } from "../utils/localStorageUtils";
import { getSession } from "../utils/session";
import { v4 as uuidv4 } from "uuid";

export default function CreateEvent() {
  const session = getSession();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(""); // Base64 image
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // Base64 image data
    };
    reader.readAsDataURL(file);
  };

  const handleCreate = () => {
    if (!title || !date || !description || !location || !image || !category) {
      return alert("All fields are required");
    }

    const events = readLS(LS.EVENTS, []);
    const newEvent = {
      id: uuidv4(),
      title,
      date,
      description,
      location,
      image,
      category,
      tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag !== ""),
      creatorId: session.id,
      approved: session.role === "admin",
    };

    events.push(newEvent);
    writeLS(LS.EVENTS, events);

    alert("Event created successfully!");
    navigate("/events");
  };

  if (!session) {
    return (
      <div className="text-center p-6">
        Please login to create events.
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow mt-8">
      <h2 className="text-2xl font-semibold mb-4">Create Event</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Event Title"
        className="w-full border rounded px-3 py-2 mb-3"
      />

      <input
        value={date}
        onChange={(e) => setDate(e.target.value)}
        type="date"
        className="w-full border rounded px-3 py-2 mb-3"
      />

      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        className="w-full border rounded px-3 py-2 mb-3"
      />

      {/* Image Upload Input */}
      <div className="mb-3">
        <label className="block mb-1 text-sm font-medium">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full border rounded px-3 py-2"
        />
        {image && (
          <img
            src={image}
            alt="Preview"
            className="mt-3 w-full rounded-lg shadow"
          />
        )}
      </div>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full border rounded px-3 py-2 mb-3"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border rounded px-3 py-2 mb-3"
      >
        <option value="">Select Category</option>
        <option value="Conference">Conference</option>
        <option value="Workshop">Workshop</option>
        <option value="Meetup">Meetup</option>
        <option value="Webinar">Webinar</option>
      </select>

      <input
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma-separated, e.g. tech,react,frontend)"
        className="w-full border rounded px-3 py-2 mb-4"
      />

      <button
        onClick={handleCreate}
        className="w-full bg-indigo-600 text-white py-2 rounded"
      >
        Create Event
      </button>
    </div>
  );
}

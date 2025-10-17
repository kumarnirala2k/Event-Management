import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readLS, writeLS, LS } from "../utils/localStorageUtils";
import { motion } from "framer-motion";

export default function EventDetails() {
  const { id } = useParams();
  const events = readLS(LS.EVENTS, []);
  const event = events.find((e) => e.id === id);

  // --- Local States for Rating & Interested
  const [interested, setInterested] = useState(false);
  const [rating, setRating] = useState(0);

  // --- Load previous preferences from LS
  useEffect(() => {
    const stored = readLS("EVENT_PREFERENCES", {});
    if (stored[id]) {
      setInterested(stored[id].interested);
      setRating(stored[id].rating || 0);
    }
  }, [id]);

  // --- Save preferences to LS
  const savePreferences = (newInterested, newRating) => {
    const stored = readLS("EVENT_PREFERENCES", {});
    stored[id] = {
      interested: newInterested ?? interested,
      rating: newRating ?? rating,
    };
    writeLS("EVENT_PREFERENCES", stored);
  };

  const toggleInterested = () => {
    const newValue = !interested;
    setInterested(newValue);
    savePreferences(newValue, rating);
  };

  const handleRating = (value) => {
    setRating(value);
    savePreferences(interested, value);
  };

  if (!event) {
    return (
      <div className="text-center py-10 text-gray-600">
        Event not found.{" "}
        <Link to="/events" className="text-indigo-600 underline">
          Go back
        </Link>
      </div>
    );
  }

  const categoryColors = {
    Conference: "bg-blue-500 text-white",
    Workshop: "bg-green-500 text-white",
    Meetup: "bg-purple-500 text-white",
    Webinar: "bg-pink-500 text-white",
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-lg">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        {/* Image Section */}
        {event.image ? (
          <motion.img
            src={event.image}
            alt={event.title}
            className="w-full h-64 object-fill rounded-xl mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-xl mb-6 text-gray-500 text-xl">
            No Image
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 sm:mb-0">
            {event.title}
          </h1>
          {event.category && (
            <span
              className={`px-4 py-1 rounded-full text-sm font-semibold ${
                categoryColors[event.category] ||
                "bg-gray-300 text-gray-800"
              }`}
            >
              {event.category}
            </span>
          )}
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 text-gray-600 mb-6 text-sm">
          <p><span className="font-bold">Time : </span>{event.time && <span>{event.time}</span>} </p>
          <p><span className="font-bold">Date : </span>{new Date(event.date).toLocaleDateString()}</p>
          {event.location && <p><span className="font-bold">Location : </span> {event.location}</p>}
          {event.creatorId && (
            <p>👤 Created by: {event.user || event.creatorId}</p>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-800 leading-relaxed mb-6">
          {event.description}
        </p>

        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {event.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-indigo-100 text-indigo-700 rounded-full px-3 py-1"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* --- INTERESTED BUTTON --- */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <motion.button
            onClick={toggleInterested}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-lg font-medium text-white shadow transition ${
              interested
                ? "bg-green-600 hover:bg-green-700"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {interested ? "✅ Interested" : "⭐ Mark as Interested"}
          </motion.button>

          {/* --- RATING SECTION --- */}
          <div className="mt-4 sm:mt-0 flex items-center gap-2">
            <p className="text-gray-700 font-medium">Rate:</p>
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.span
                key={star}
                whileHover={{ scale: 1.2 }}
                onClick={() => handleRating(star)}
                className={`cursor-pointer text-2xl transition ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </motion.span>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link
            to="/events"
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-lg shadow transition"
          >
            ← Back to Events
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { readLS, LS } from "../utils/localStorageUtils";
import { motion } from "framer-motion";

export default function Events() {
  const events = readLS(LS.EVENTS, []);
  const approved = events.filter((e) => e.approved);

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [filterCategory, setFilterCategory] = useState("All");

  const categoryColors = {
    Conference: "bg-blue-500 text-white",
    Workshop: "bg-green-500 text-white",
    Meetup: "bg-purple-500 text-white",
    Webinar: "bg-pink-500 text-white",
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, type: "spring", stiffness: 100 },
    }),
    hover: { scale: 1.05, boxShadow: "0px 15px 20px rgba(0,0,0,0.15)" },
  };

  // 🔍 Filter + Sort Logic
  const filteredEvents = useMemo(() => {
  let filtered = approved;

  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (e) =>
        (e.title?.toLowerCase().includes(q) ?? false) ||
        (e.location?.toLowerCase().includes(q) ?? false) ||
        (e.description?.toLowerCase().includes(q) ?? false)
    );
  }

  if (filterCategory !== "All") {
    filtered = filtered.filter((e) => e.category === filterCategory);
  }

  filtered = filtered.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  return filtered;
}, [approved, search, sortOrder, filterCategory]);


  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        All Events
      </h2>

      {/* 🔧 Controls */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, location, or description"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400"
        >
          <option value="All">All Categories</option>
          <option value="Conference">Conference</option>
          <option value="Workshop">Workshop</option>
          <option value="Meetup">Meetup</option>
          <option value="Webinar">Webinar</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* 🧩 Event Grid */}
      {filteredEvents.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No events found.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredEvents.map((e, index) => (
            <motion.div
              key={e.id}
              custom={index}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={cardVariants}
              className="rounded-2xl overflow-hidden cursor-pointer"
            >
              <Link
                to={`/events/${e.id}`}
                className="bg-white flex flex-col h-full rounded-2xl"
              >
                {e.image ? (
                  <motion.img
                    src={e.image}
                    alt={e.title}
                    className="h-48 w-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <div className="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-400 text-xl font-semibold">
                    No Image
                  </div>
                )}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-1 text-gray-900">
                    {e.title}
                  </h3>
                  <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
                    <span>{new Date(e.date).toLocaleDateString()}</span>
                    {e.category && (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          categoryColors[e.category] ||
                          "bg-gray-300 text-gray-800"
                        }`}
                      >
                        {e.category}
                      </span>
                    )}
                  </div>
                  {e.location && (
                    <p className="text-sm text-gray-600 mb-2">📍 {e.location}</p>
                  )}
                  <p className="text-gray-700 flex-grow line-clamp-3">
                    {e.description}
                  </p>
                  {e.tags && e.tags.length > 0 && (
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
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

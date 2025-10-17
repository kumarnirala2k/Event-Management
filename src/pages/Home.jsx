import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { readLS, LS } from "../utils/localStorageUtils";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const fadeUpVariants = {
  enter: {
    opacity: 0,
    y: 30,
  },
  center: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -30,
  },
};

export default function Home() {
  const events = readLS(LS.EVENTS, []);
  const approved = events.filter((e) => e.approved);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (approved.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === approved.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [approved.length]);

  return (
    <>
      {/* Carousel */}
      <section className="relative w-full overflow-hidden bg-indigo-600 text-white">
        <AnimatePresence mode="wait">
          {approved.length > 0 && (
            <motion.div
              key={approved[current].id}
              variants={fadeUpVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-20"
            >
              {/* Text Content */}
              <div className="md:w-1/2 space-y-4">
                <h2 className="text-4xl font-bold">{approved[current].title}</h2>
                <p className="text-lg opacity-90 line-clamp-3">
                  {approved[current].description}
                </p>
                <p className="italic">
                  {new Date(approved[current].date).toLocaleDateString()}
                </p>
                <Link
                  to={`/events/${approved[current].id}`}
                  className="inline-block mt-4 px-6 py-2 bg-white text-indigo-600 font-semibold rounded shadow hover:bg-gray-100 transition"
                >
                  View Details
                </Link>
              </div>

              {/* Image (optional) */}
              <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
                {approved[current].image ? (
                  <img
                    src={approved[current].image}
                    alt={approved[current].title}
                    className="rounded-lg max-h-64 shadow-lg bg-white h-160 w-120 object-center object-fill p-1"
                  />
                ) : (
                  <div className="w-full max-w-md h-64 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-semibold select-none">
                    No Image Available
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Intro Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
        <div>
          <h1 className="text-4xl font-extrabold text-indigo-700 leading-tight mb-5">
            Create, discover, and manage local events
          </h1>
          <p className="text-gray-700 max-w-lg">
            Find information on Mechanical & Electricity trade shows, trade fairs, business trade fairs, business trade exhibitions held across the globe.

          </p>
          <div className="mt-8 flex gap-4 flex-wrap">
            <Link
              to="/events"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition"
            >
              View Events
            </Link>
            <Link
              to="/create"
              className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition"
            >
              Create Event
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-indigo-700">
            Upcoming Events
          </h3>
          {approved.length === 0 ? (
            <p className="text-gray-500">No upcoming approved events.</p>
          ) : (
            <ul className="space-y-3">
              {approved.slice(0, 4).map((e) => (
                <li
                  key={e.id}
                  className="p-3 rounded cursor-pointer hover:bg-indigo-50 transition flex justify-between items-center"
                >
                  <Link
                    to={`/events/${e.id}`}
                    className="font-medium text-indigo-600 hover:underline"
                  >
                    {e.title}
                  </Link>
                  <span className="text-sm text-gray-500">
                    {new Date(e.date).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-indigo-50 py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          <div className="text-center space-y-3 p-4 bg-white rounded-lg shadow">
            <div className="mx-auto w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
              📅
            </div>
            <h4 className="text-xl font-semibold">Easy Event Creation</h4>
            <p className="text-gray-600">
              Quickly create events with details, images, categories and more.
            </p>
          </div>
          <div className="text-center space-y-3 p-4 bg-white rounded-lg shadow">
            <div className="mx-auto w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
              🔍
            </div>
            <h4 className="text-xl font-semibold">Discover Nearby Events</h4>
            <p className="text-gray-600">
              Browse approved events happening around your community.
            </p>
          </div>
          <div className="text-center space-y-3 p-4 bg-white rounded-lg shadow">
            <div className="mx-auto w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
              ⚙️
            </div>
            <h4 className="text-xl font-semibold">Manage With Ease</h4>
            <p className="text-gray-600">
              Admin controls and user dashboards to keep things organized.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold text-center mb-10 text-indigo-700">
          How It Works
        </h3>
        <div className="grid md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4 p-6 bg-white rounded-lg shadow">
            <div className="text-indigo-600 text-5xl">📝</div>
            <h4 className="text-xl font-semibold">Create Your Event</h4>
            <p className="text-gray-600">
              Fill out the event details and submit for approval or auto-approve if you are admin.
            </p>
          </div>
          <div className="space-y-4 p-6 bg-white rounded-lg shadow">
            <div className="text-indigo-600 text-5xl">🔎</div>
            <h4 className="text-xl font-semibold">Discover Events</h4>
            <p className="text-gray-600">
              Find upcoming events in your area or interests.
            </p>
          </div>
          <div className="space-y-4 p-6 bg-white rounded-lg shadow">
            <div className="text-indigo-600 text-5xl">🎉</div>
            <h4 className="text-xl font-semibold">Join & Enjoy</h4>
            <p className="text-gray-600">
              Participate, share, and manage your own events with ease.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-indigo-50 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-10 text-indigo-700">
            What People Say
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow p-6 italic text-gray-700">
              "This platform made it so easy to organize community meetups!"
              <div className="mt-4 font-semibold text-indigo-600">- Priya S.</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 italic text-gray-700">
              "Admin dashboard is powerful and intuitive, I love it."
              <div className="mt-4 font-semibold text-indigo-600">- Amit K.</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 italic text-gray-700">
              "The local events discovery helped me meet new people nearby."
              <div className="mt-4 font-semibold text-indigo-600">- Neha M.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-700 text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} EventManager. All rights reserved.</p>
          <nav className="space-x-6 mt-4 md:mt-0">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:underline">
              GitHub
            </a>
            <a href="/privacy" className="hover:underline">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:underline">
              Terms
            </a>
          </nav>
        </div>
      </footer>
    </>
  );
}

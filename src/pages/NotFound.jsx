import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="p-12 text-center">
      <h2 className="text-3xl font-semibold mb-3">404 - Page Not Found</h2>
      <p className="text-gray-500 mb-6">
        The page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Go Home
      </Link>
    </div>
  );
}

import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export default function ApprovedModal({ show, onCancel, onConfirm }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="bg-white rounded-lg shadow p-6 z-50 w-96"
          >
            <h3 className="text-lg font-semibold">Confirm Approve</h3>
            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to Approve The Event?
            </p>
            <div className="mt-4 flex justify-end gap-3">
              <button onClick={onCancel} className="px-3 py-2 border rounded">
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-3 py-2 bg-green-600 text-white rounded font-bold"
              >
                Approved
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

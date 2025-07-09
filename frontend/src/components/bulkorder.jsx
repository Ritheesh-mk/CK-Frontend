import React, { useState } from "react";
import { BulkOrderModal } from "./BulkOrderModal";

const BulkOrderDemo = ({ onBack }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center p-4 relative">
      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 flex items-center text-emerald-700 hover:text-emerald-900 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Products
      </button>

      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-4"> CK Masala</h1>
          <h2 className="text-2xl font-semibold text-emerald-700 mb-2">
            Wholesale & Bulk Orders
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Premium spices for restaurants, hotels, and food businesses. Get
            competitive wholesale pricing with our easy order system.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => setModalOpen(true)}
            className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-500 text-white font-bold rounded-xl shadow-lg hover:from-emerald-700 hover:to-green-600 transition-all transform hover:scale-105 flex items-center mx-auto"
          >
            <svg
              className="w-6 h-6 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            Start Bulk Order
          </button>

          <div className="flex justify-center items-center space-x-8 text-sm text-gray-500 mt-6">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
              Minimum Order: 25kg
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
              Wholesale Pricing
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
              Custom Packaging
            </div>
          </div>
        </div>
      </div>

      <BulkOrderModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default BulkOrderDemo;
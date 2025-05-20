"use client";
import { useEffect, useState } from "react";
import { DoctorCard } from "./doctorCard";
import { Dialog } from "@headlessui/react"; // For Modal (uses Headless UI)

const AllDoctors = ({ doctors }) => {
  const [filters, setFilters] = useState({
    minFee: 0,
    maxFee: 5000,
    category: "",
    search: "",
  });
  const [showModal, setShowModal] = useState(false);

  const doctorList = Array.isArray(doctors) ? doctors : [];

  // Get Unique Specializations (Categories) Dynamically
  const categories = [...new Set(doctorList.map((doc) => doc.specialization))];

  const filteredDoctors = doctorList.filter(
    (doc) =>
      doc.consultationFees >= filters.minFee &&
      doc.consultationFees <= filters.maxFee &&
      (filters.category ? doc.specialization === filters.category : true) &&
      (filters.search
        ? doc.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          doc.specialization.toLowerCase().includes(filters.search.toLowerCase())
        : true)
  );

  console.log("Filtered Doctors: ", filteredDoctors);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-blue-100 p-4 md:p-6 mb-[30px] mt-[-40px]">
      
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="w-full p-3 bg-teal-600 text-white font-bold rounded-xl shadow-md hover:bg-teal-700 transition-all"
        >
          Filter Doctors ⚡
        </button>
      </div>

      {/* Sidebar Filters */}
      <div className="hidden md:block md:w-1/4 md:pr-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6 space-y-6">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            categories={categories}
          />
        </div>
      </div>

      {/* Main Doctor List */}
      <div className="md:w-3/4">
        <h1 className="text-3xl font-bold text-teal-800 mb-8">Available Doctors</h1>

        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor, index) => (
              <div
                key={doctor._id || doctor.slug || index}
                className="bg-white border-2 border-teal-300 rounded-2xl shadow-lg p-4 hover:scale-[1.02] transition-transform duration-300"
              >
                <DoctorCard doctor={doctor} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 mt-20">
            <p className="text-xl font-semibold">No doctors found matching your filters. 🧐</p>
          </div>
        )}
      </div>

      {/* Modal for Mobile Filters */}
      <Dialog open={showModal} onClose={() => setShowModal(false)} className="relative z-50 md:hidden">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-2xl p-6 space-y-6 shadow-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-teal-700">Filters</h2>
              <button onClick={() => setShowModal(false)} className="text-teal-600 font-bold">
                Close ✖️
              </button>
            </div>

            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              categories={categories}
            />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

// Reusable Filter Sidebar Component
const FilterSidebar = ({ filters, setFilters, categories }) => (
  <div className="space-y-6">
    {/* Search */}
    <input
      type="text"
      placeholder="🔍 Search name or specialty"
      value={filters.search}
      onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      className="w-full p-3 border-2 border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-400 transition-all"
    />

    {/* Fee Range */}
    <div>
      <label className="block text-gray-700 font-medium mb-2">
        Fee Range: <span className="text-teal-600 font-bold">₹{filters.minFee} - ₹{filters.maxFee}</span>
      </label>
      <div className="flex space-x-4">
        <input
          type="number"
          min="0"
          max="5000"
          step="100"
          value={filters.minFee}
          onChange={(e) => setFilters({ ...filters, minFee: Number(e.target.value) })}
          className="w-1/2 p-2 border rounded-lg text-center"
          placeholder="Min Fee"
        />
        <input
          type="number"
          min="0"
          max="5000"
          step="100"
          value={filters.maxFee}
          onChange={(e) => setFilters({ ...filters, maxFee: Number(e.target.value) })}
          className="w-1/2 p-2 border rounded-lg text-center"
          placeholder="Max Fee"
        />
      </div>
    </div>

    {/* Specialization */}
    <div>
      <label className="block text-gray-700 font-medium mb-2">Specialization</label>
      <select
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        className="w-full p-3 border-2 border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
      >
        <option value="">All Categories</option>
        {categories.map((cat, idx) => (
          <option key={idx} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default AllDoctors;

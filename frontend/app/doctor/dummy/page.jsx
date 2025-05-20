"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MessageCircle, Video, Settings, User, DollarSign } from "lucide-react";

export default function DoctorDashboard() {
  const [selectedTab, setSelectedTab] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-4">
        <h2 className="text-xl font-bold mb-4">Doctor Panel</h2>
        <nav className="space-y-2">
          <button className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200" onClick={() => setSelectedTab("dashboard")}>
            <Calendar className="w-5 h-5" /> Dashboard
          </button>
          <button className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200" onClick={() => setSelectedTab("appointments")}>
            <Calendar className="w-5 h-5" /> Appointments
          </button>
          <button className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200" onClick={() => setSelectedTab("patients")}>
            <User className="w-5 h-5" /> Patients
          </button>
          <button className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200" onClick={() => setSelectedTab("chat")}>
            <MessageCircle className="w-5 h-5" /> Chat
          </button>
          <button className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200" onClick={() => setSelectedTab("video")}>
            <Video className="w-5 h-5" /> Video Calls
          </button>
          <button className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200" onClick={() => setSelectedTab("settings")}>
            <Settings className="w-5 h-5" /> Settings
          </button>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6">
        {selectedTab === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Dashboard Cards */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="p-6 bg-gradient-to-br from-teal-500 to-teal-300 text-white rounded-xl shadow-md">
              <h2 className="text-lg font-semibold">Total Appointments</h2>
              <p className="text-2xl font-bold">120</p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="p-6 bg-gradient-to-br from-teal-500 to-teal-300 text-white rounded-xl shadow-md">
              <h2 className="text-lg font-semibold">Total Patients</h2>
              <p className="text-2xl font-bold">75</p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="p-6 bg-gradient-to-br from-teal-500 to-teal-300 text-white rounded-xl shadow-md">
              <h2 className="text-lg font-semibold">Earnings</h2>
              <p className="text-2xl font-bold">$5,000</p>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
}

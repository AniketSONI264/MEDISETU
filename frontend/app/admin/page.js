'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Calendar,
  CreditCard,
  FileText,
  TrendingUp,
  Activity
} from 'lucide-react';

const stats = [
  {
    title: 'Total Users',
    value: '2,543',
    change: '+12.5%',
    icon: Users,
    color: 'blue'
  },
  {
    title: 'Active Doctors',
    value: '156',
    change: '+8.2%',
    icon: Users,
    color: 'green'
  },
  {
    title: 'Appointments',
    value: '1,234',
    change: '+23.1%',
    icon: Calendar,
    color: 'purple'
  },
  {
    title: 'Revenue',
    value: '₹45,678',
    change: '+18.3%',
    icon: CreditCard,
    color: 'orange'
  }
];

const recentActivities = [
  {
    type: 'appointment',
    title: 'New Appointment',
    description: 'Dr. Sharma has a new appointment with John Doe',
    time: '5 minutes ago'
  },
  {
    type: 'doctor',
    title: 'Doctor Verified',
    description: 'Dr. Patel has been verified',
    time: '1 hour ago'
  },
  {
    type: 'payment',
    title: 'Payment Received',
    description: 'Payment of ₹2,500 received from Sarah Smith',
    time: '2 hours ago'
  }
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6 mt-[50px]">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <div className="flex items-center gap-4">
          <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select> 
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <p className="text-sm text-green-600 mt-1">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-full bg-${stat.color}-50`}>
                <stat.icon className={`text-${stat.color}-500`} size={24} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="p-2 rounded-full bg-blue-50">
                <Activity size={20} className="text-blue-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{activity.title}</h3>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
  
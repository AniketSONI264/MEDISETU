'use client';

import { motion } from 'framer-motion';

export default function AdminPageWrapper({ children, title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 sm:p-2">
        {children}
      </div>
    </motion.div>
  );
} 
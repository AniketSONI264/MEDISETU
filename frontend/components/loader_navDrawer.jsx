"use client";

import { motion } from "framer-motion";
import { FaStethoscope } from "react-icons/fa"; // Stethoscope icon
import { MdOutlineMedicalServices } from "react-icons/md"; // Medical feel
import { BsHeartPulse } from "react-icons/bs"; // Adds pulsing heart touch

export default function FullScreenLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center w-full h-screen px-4 sm:px-6 bg-gradient-to-br from-cyan-50 via-white to-teal-100"
    >
      <div className="flex flex-col items-center gap-5 max-w-[90vw] text-center">
        {/* Medical Icon */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className="text-teal-600"
        >
          <FaStethoscope size={70} className="sm:size-[80px]" />
        </motion.div>

        {/* Loading Text with Icon */}
        <div className="flex flex-wrap justify-center items-center gap-2 animate-pulse text-lg sm:text-xl font-semibold text-teal-800">
          <BsHeartPulse className="text-rose-500 animate-bounce" size={20} />
          <span>Waking up MediSetu Dashboard...</span>
          <MdOutlineMedicalServices className="text-indigo-500" size={20} />
        </div>

        {/* Sub Text */}
        <p className="text-xs sm:text-sm text-gray-600 max-w-xs sm:max-w-sm">
          Bringing healthcare to your fingertips 💻🩺
        </p>
      </div>
    </motion.div>
  );
}
  
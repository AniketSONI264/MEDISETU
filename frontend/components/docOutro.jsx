

"use client";
import { motion } from "framer-motion";
import { ShieldCheck, HeartHandshake, Sparkles } from "lucide-react";

const cardVariants = {
  animate: {
    rotate: [-1.5, 1.5, -1.5],
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: "easeInOut",
    },
  },
  whileHover: {
    scale: 1.05,
    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
  },
};

const iconVariants = {
  initial: { y: 0 },
  animate: {
    y: [0, -4, 0],
    transition: {
      repeat: Infinity,
      duration: 1.2,
      ease: "easeInOut",
    },
  },
};

export default function DoctorRegistrationOutro() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-white py-10 px-4 md:px-16 border-t border-gray-200"
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-bold text-teal-700 mb-4"
        >
          🌟 Why Your Profile Matters
        </motion.h3>

        <p className="text-gray-700 max-w-3xl mx-auto mb-8 text-base md:text-lg">
          Your MediSetu profile isn’t just a formality. It’s your digital clinic—your space to connect, care, and build trust. Patients today check credentials <strong>before</strong> appointments—make sure you stand out with accuracy and warmth.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Trust */}
          <motion.div
            className="p-6 bg-gradient-to-br from-teal-50 to-white border border-teal-100 rounded-2xl shadow-md transition-all"
            variants={cardVariants}
            animate="animate"
            whileHover="whileHover"
          >
            <div className="flex items-center gap-3 mb-2">
              <motion.div variants={iconVariants} animate="animate">
                <ShieldCheck className="text-teal-600" size={24} />
              </motion.div>
              <h4 className="font-semibold text-teal-800 text-lg">
                Verified = Trusted
              </h4>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Patients are more likely to book with verified doctors. Accurate details help us validate and display your credentials confidently.
            </p>
          </motion.div>

          {/* Compassion */}
          <motion.div
            className="p-6 bg-gradient-to-br from-teal-50 to-white border border-teal-100 rounded-2xl shadow-md transition-all"
            variants={cardVariants}
            animate="animate"
            whileHover="whileHover"
          >
            <div className="flex items-center gap-3 mb-2">
              <motion.div variants={iconVariants} animate="animate">
                <HeartHandshake className="text-teal-600" size={24} />
              </motion.div>
              <h4 className="font-semibold text-teal-800 text-lg">
                Build Meaningful Bonds
              </h4>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              A thoughtful bio, a smile in your profile photo—these little things build comfort before the first call. Be human, be you.
            </p>
          </motion.div>

          {/* Stand Out */}
          <motion.div
            className="p-6 bg-gradient-to-br from-teal-50 to-white border border-teal-100 rounded-2xl shadow-md transition-all"
            variants={cardVariants}
            animate="animate"
            whileHover="whileHover"
          >
            <div className="flex items-center gap-3 mb-2">
              <motion.div variants={iconVariants} animate="animate">
                <Sparkles className="text-teal-600" size={24} />
              </motion.div>
              <h4 className="font-semibold text-teal-800 text-lg">
                Stand Out from the Crowd
              </h4>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your unique expertise and approach deserve to shine. Use this opportunity to highlight what makes you different.
            </p>
          </motion.div>
        </div>

        <p className="mt-10 text-xs text-gray-400 italic">
          🔒 All your data is securely stored and used solely for verification & communication within MediSetu.
        </p>
      </div>
    </motion.section>
  );
}

// 'use client';

// import { motion } from "framer-motion";
// import { UserCircle2, AlertCircle } from "lucide-react";
// import DoctorProfilePage from "./docProfile"; // Adjust the path if needed

// export default function DoctorPageContent({ doctorData }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 60 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       className="min-h-screen pt-24 pb-32 mb-[20px] px-4 sm:px-8 md:px-16 bg-gradient-to-b from-white via-gray-50 to-gray-100"
//     >
//       <div className="text-center mb-10">
//         <motion.h1
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ delay: 0.3, duration: 0.5 }}
//           className="text-3xl sm:text-4xl font-bold text-teal-600 flex items-center justify-center gap-3"
//         >
//           <UserCircle2 className="w-10 h-10 text-teal-500" />
//           Doctor Profile
//         </motion.h1>
//         <p className="text-sm sm:text-base mt-2 text-gray-600">
//           Get to know your specialist better
//         </p>
//       </div>

//       {doctorData ? (
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5, duration: 0.6 }}
//         >
//           <DoctorProfilePage doctor={doctorData} />
//         </motion.div>
//       ) : (
//         <motion.div
//           initial={{ scale: 0.95, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ delay: 0.4, duration: 0.5 }}
//           className="flex flex-col items-center justify-center text-center py-20 rounded-xl bg-red-50 border border-red-200"
//         >
//           <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
//           <h2 className="text-xl font-semibold text-red-600">Doctor not found 🚫</h2>
//           <p className="text-sm mt-2 text-gray-500 max-w-sm">
//             The profile you're looking for might have been removed or doesn’t exist. Please check the URL or try again.
//           </p>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// }





'use client';

import {useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserCircle2,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronUp,
  ArrowLeft
} from "lucide-react";
import DoctorProfilePage from "./docProfile";
import { toast } from 'react-hot-toast';


const iconWiggle = {
  animate: { rotate: [-10, 10, -10] },
  transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
};

export default function DoctorPageContent({ doctorData }) {
  const [showInstructions, setShowInstructions] = useState(false);
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      // className="min-h-screen pt-24 pb-32 mb-[100px] px-4 sm:px-8 md:px-16 bg-gradient-to-b from-white via-gray-50 to-gray-100"
      className="min-h-screen pt-24 pb-32 mb-[100px] px-4 sm:px-8 md:px-16 bg-gradient-to-b from-[#E0F7FA] via-[#FFFFFF] to-[#B2EBF2]"

    >
      <div className="absolute lg:top-24 sm:top-6 left-4 sm:left-8 flex items-center gap-2 lg:ml-[60px]">
  <button
    onClick={() => router.push('/all-doctors')}
    className="flex items-center text-teal-600 hover:text-teal-800 transition-colors font-medium"
  >
    <ArrowLeft className="w-6 h-6" />
    <span className="ml-1 hidden sm:inline">Back</span> 
  </button>
</div>

      {/* Header */}
      <div className="text-center mb-10">
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-teal-600 flex items-center justify-center gap-3"
        >
          <motion.div {...iconWiggle} className="flex items-center justify-center">
            <UserCircle2 className="w-10 h-10 text-teal-500" />
          </motion.div>
          Doctor Profile
        </motion.h1>
        <p className="text-sm sm:text-base mt-2 text-gray-600">
          Get to know your specialist better
        </p>
      </div>

      {/* Appointment Instructions */}
      <div className="mb-10 max-w-3xl mx-auto">
        <button
          onClick={() => setShowInstructions(!showInstructions)}
          className="flex items-center justify-between w-full px-5 py-3 text-sm sm:text-base font-medium text-white bg-teal-600 rounded-lg shadow hover:bg-teal-700 transition-all"
        >
          <span className="flex items-center gap-2">
            <motion.div {...iconWiggle} className="flex items-center justify-center">
              <Info className="w-5 h-5" />
            </motion.div>
            How to Book an Appointment
          </span>
          {showInstructions ? (
            <motion.div {...iconWiggle}>
              <ChevronUp />
            </motion.div>
          ) : (
            <motion.div {...iconWiggle}>
              <ChevronDown />
            </motion.div>
          )}
        </button>

        <AnimatePresence>
          {showInstructions && (
            <motion.div
              key="instructions"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-4 bg-white rounded-md shadow-inner p-5 border"
            >
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-2">
                <li>👨‍⚕️ Browse the doctor's profile to check their expertise & availability.</li>
                <li>📅 Select an available time slot that fits your schedule.</li>
                <li>📝 Fill out the appointment form with your details and symptoms.</li>
                <li>💳 Confirm your booking and make payment (if required).</li>
                <li>📧 You'll receive an email or SMS with the meeting link or location.</li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Doctor Profile or Error */}
      {doctorData ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <DoctorProfilePage doctor={doctorData} />
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col items-center justify-center text-center py-20 rounded-xl bg-red-50 border border-red-200"
        >
          <motion.div {...iconWiggle} className="mb-4">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </motion.div>
          <h2 className="text-xl font-semibold text-red-600">Doctor not found 🚫</h2>
          <p className="text-sm mt-2 text-gray-500 max-w-sm">
            The profile you're looking for might have been removed or doesn’t exist. Please check the URL or try again.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

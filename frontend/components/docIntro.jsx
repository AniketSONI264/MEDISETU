// import { motion } from "framer-motion";
// import { BookOpen, Info, Clock3, ClipboardList } from "lucide-react";

// // Variants for staggering card animation
// const cardVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: (i) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: 0.2 + i * 0.2, duration: 0.5 },
//   }),
// };

// export default function DoctorRegistrationIntro() {
//   return (
//     <motion.section
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//       className="w-full bg-gradient-to-br from-teal-50 to-white border-b border-teal-200 py-10 px-4 md:px-16"
//     >
//       <div className="max-w-6xl mx-auto">
//         <motion.h2
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="text-3xl md:text-4xl font-extrabold text-teal-800 mb-4 tracking-tight"
//         >
//           👨‍⚕️ Become a Verified Doctor on <span className="text-teal-600">MediSetu</span>
//         </motion.h2>
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           className="text-gray-700 text-base md:text-lg mb-6 max-w-3xl"
//         >
//           Join our trusted network of healthcare professionals. Creating your profile ensures patients can find, trust, and connect with you for both in-person and online consultations.
//         </motion.p>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
//           {[ // Dynamically loop through card info for clean code
//             {
//               title: "Step 1: Basic Info",
//               icon: <Info className="text-teal-600" size={24} />,
//               description:
//                 "Enter your full name, contact details, and pincode. We’ll autofill city and state for speed. Use an active email and phone number.",
//             },
//             {
//               title: "Step 2: Credentials",
//               icon: <ClipboardList className="text-teal-600" size={24} />,
//               description:
//                 "Fill in your specialization, experience, qualifications, and registration number. This is displayed on your public profile.",
//             },
//             {
//               title: "Step 3: Availability",
//               icon: <Clock3 className="text-teal-600" size={24} />,
//               description:
//                 "Set the days and timings you're available. Patients will only be able to book slots based on your set schedule.",
//             },
//             {
//               title: "Step 4: Profile",
//               icon: <BookOpen className="text-teal-600" size={24} />,
//               description:
//                 "Upload a professional photo and write a brief yet impactful bio. Patients trust profiles that feel human and credible.",
//             },
//           ].map((card, i) => (
//             <motion.div
//               key={i}
//               custom={i}
//               initial="hidden"
//               animate="visible"
//               variants={cardVariants}
//               whileHover={{ scale: 1.03 }}
//               className="bg-white border border-teal-100 shadow-md rounded-2xl p-5"
//             >
//               <div className="flex items-center gap-3 mb-3">
//                 {card.icon}
//                 <h3 className="text-lg font-semibold text-teal-800">{card.title}</h3>
//               </div>
//               <p className="text-sm text-gray-600 leading-relaxed">{card.description}</p>
//             </motion.div>
//           ))}
//         </div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1.2 }}
//           className="mt-6 text-sm text-gray-500 italic"
//         >
//           ⏱️ Takes just 2–3 minutes. You can edit your profile anytime after submission.
//         </motion.div>
//       </div>
//     </motion.section>
//   );
// }



import { motion } from "framer-motion";
import { BookOpen, Info, Clock3, ClipboardList } from "lucide-react";

export default function DoctorRegistrationIntro() {
  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-gradient-to-br from-teal-50 to-white border-b border-teal-200 py-10 px-4 md:px-16"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-extrabold text-teal-800 mb-4 tracking-tight"
        >
           <motion.span
  className="inline-block"
  animate={{ rotate: [-10, 10, -10] }}
  transition={{ repeat: Infinity, duration: 1.0, ease: "easeInOut" }}
>
  👨‍⚕️
</motion.span>
          Become a Verified Doctor on{" "}
          <span className="text-teal-600">MediSetu</span>
        </motion.h2>
        <p className="text-gray-700 text-base md:text-lg mb-6 max-w-3xl">
          Join our trusted network of healthcare professionals. Creating your profile ensures
          patients can find, trust, and connect with you for both in-person and online consultations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {/* CARD 1 */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white border border-teal-100 shadow-md rounded-2xl p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <motion.div
                animate={{ rotate: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
              >
                <Info className="text-teal-600" size={24} />
              </motion.div>
              <h3 className="text-lg font-semibold text-teal-800">Step 1: Basic Info</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Enter your full name, contact details, and pincode. We’ll autofill city and state
              for speed. Use an active email and phone number.
            </p>
          </motion.div>

          {/* CARD 2 */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white border border-teal-100 shadow-md rounded-2xl p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <motion.div
                animate={{ rotate: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
              >
                <ClipboardList className="text-teal-600" size={24} />
              </motion.div>
              <h3 className="text-lg font-semibold text-teal-800">Step 2: Credentials</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Fill in your specialization, experience, qualifications, and registration number.
              This is displayed on your public profile.
            </p>
          </motion.div>

          {/* CARD 3 */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white border border-teal-100 shadow-md rounded-2xl p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <motion.div
                animate={{ rotate: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
              >
                <Clock3 className="text-teal-600" size={24} />
              </motion.div>
              <h3 className="text-lg font-semibold text-teal-800">Step 3: Availability</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Set the days and timings you're available. Patients will only be able to book
              slots based on your set schedule.
            </p>
          </motion.div>

          {/* CARD 4 */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white border border-teal-100 shadow-md rounded-2xl p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <motion.div
                animate={{ rotate: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
              >
                <BookOpen className="text-teal-600" size={24} />
              </motion.div>
              <h3 className="text-lg font-semibold text-teal-800">Step 4: Profile</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Upload a professional photo and write a brief yet impactful bio. Patients trust
              profiles that feel human and credible.
            </p>
          </motion.div>
        </div>

        <div className="mt-6 text-sm text-gray-500 italic">
          ⏱️ Takes just 2–3 minutes. You can edit your profile anytime after submission.
        </div>
      </div>
    </motion.section>
  );
}

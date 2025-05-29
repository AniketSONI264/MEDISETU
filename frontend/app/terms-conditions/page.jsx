// import React from "react";
// import { motion } from "framer-motion";

// export default function TermsAndConditions() {
//   return (
//     <main className="p-4 md:p-16 max-w-4xl mx-auto text-gray-700">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-6">Terms & Conditions</h1>

//         <section className="space-y-4">
//           <p>
//             These Terms govern your use of MediSetu's services. By accessing or
//             using our platform, you agree to abide by them fully.
//           </p>

//           <h2 className="text-2xl font-semibold mt-6">1. Use of the Platform</h2>
//           <ul className="list-disc list-inside">
//             <li>
//               You must provide accurate and complete registration details
//             </li>
//             <li>Only authorized users may access the platform's features</li>
//             <li>
//               You agree not to misuse, hack, or disrupt services intentionally
//             </li>
//           </ul>

//           <h2 className="text-2xl font-semibold mt-6">2. Medical Disclaimer</h2>
//           <p>
//             MediSetu is not a substitute for emergency medical attention. Our
//             services are for routine consultations, and users must call local
//             authorities during medical emergencies.
//           </p>

//           <h2 className="text-2xl font-semibold mt-6">3. Payments & Refunds</h2>
//           <ul className="list-disc list-inside">
//             <li>All consultation payments are processed via Razorpay</li>
//             <li>
//               Refunds are subject to admin review and will be initiated within 5
//               working days
//             </li>
//           </ul>

//           <h2 className="text-2xl font-semibold mt-6">4. Account Suspension</h2>
//           <p>
//             We reserve the right to suspend accounts for policy violations,
//             suspicious activity, or unauthorized access.
//           </p>

//           <h2 className="text-2xl font-semibold mt-6">5. Intellectual Property</h2>
//           <ul className="list-disc list-inside">
//             <li>MediSetu logos, content, and design are proprietary</li>
//             <li>
//               You may not use or reproduce materials without written consent
//             </li>
//           </ul>

//           <h2 className="text-2xl font-semibold mt-6">6. Modifications</h2>
//           <p>
//             We may update these Terms at any time. Continued use of MediSetu
//             after changes implies acceptance of the updated Terms.
//           </p>

//           <p className="mt-10 italic">
//             Questions? Email us at legal@medisetu.com
//           </p>
//         </section>
//       </motion.div>
//     </main>
//   );
// }





import React from "react";
import { motion } from "framer-motion";
import { FaGavel, FaUserCheck, FaBriefcaseMedical, FaMoneyBillWave, FaBan, FaCopyright, FaEdit } from "react-icons/fa";

export default function TermsAndConditions() {
  return (
    <main className="p-4 md:p-16 max-w-4xl mx-auto text-gray-700">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-6 flex items-center gap-3">
          <FaGavel className="text-blue-500 animate-tilt" /> Terms & Conditions
        </h1>

        <section className="space-y-4">
          <p>
            These Terms govern your use of <span className="font-semibold text-blue-600">MediSetu</span>'s services. By accessing or
            using our platform, you agree to abide by them fully.
          </p>

          <h2 className="text-2xl font-semibold mt-6 flex items-center gap-2">
            <FaUserCheck className="text-green-500 animate-tilt" /> 1. Use of the Platform
          </h2>
          <ul className="list-disc list-inside">
            <li>
              You must provide accurate and complete registration details
            </li>
            <li>Only authorized users may access the platform's features</li>
            <li>
              You agree not to misuse, hack, or disrupt services intentionally
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 flex items-center gap-2">
            <FaBriefcaseMedical className="text-red-500 animate-tilt" /> 2. Medical Disclaimer
          </h2>
          <p>
            <span className="font-semibold text-blue-600">MediSetu</span> is not a substitute for emergency medical attention. Our
            services are for routine consultations, and users must call local
            authorities during medical emergencies.
          </p>

          <h2 className="text-2xl font-semibold mt-6 flex items-center gap-2">
            <FaMoneyBillWave className="text-yellow-600 animate-tilt" /> 3. Payments & Refunds
          </h2>
          <ul className="list-disc list-inside">
            <li>All consultation payments are processed via Razorpay</li>
            <li>
              Refunds are subject to admin review and will be initiated within 5
              working days
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 flex items-center gap-2">
            <FaBan className="text-pink-600 animate-tilt" /> 4. Account Suspension
          </h2>
          <p>
            We reserve the right to suspend accounts for policy violations,
            suspicious activity, or unauthorized access.
          </p>

          <h2 className="text-2xl font-semibold mt-6 flex items-center gap-2">
            <FaCopyright className="text-indigo-600 animate-tilt" /> 5. Intellectual Property
          </h2>
          <ul className="list-disc list-inside">
            <li><span className="font-semibold text-blue-600">MediSetu</span> logos, content, and design are proprietary</li>
            <li>
              You may not use or reproduce materials without written consent
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 flex items-center gap-2">
            <FaEdit className="text-gray-600 animate-tilt" /> 6. Modifications
          </h2>
          <p>
            We may update these Terms at any time. Continued use of <span className="font-semibold text-blue-600">MediSetu</span>
            after changes implies acceptance of the updated Terms.
          </p>

          <p className="mt-10 italic">
            Questions? Email us at <a href="mailto:legal@medisetu.com" className="text-blue-700 font-medium">legal@medisetu.com</a>
          </p>
        </section>
      </motion.div>
    </main>
  );
}

// import React from "react";
// import { motion } from "framer-motion";

// export default function PrivacyPolicy() {
//   return (
//     <main className="p-4 md:p-16 max-w-4xl mx-auto text-gray-700">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-6">Privacy Policy</h1>

//         <section className="space-y-4">
//           <p>
//             Welcome to MediSetu. This Privacy Policy describes how we collect,
//             use, and protect your information when you use our platform.
//           </p>

//           <h2 className="text-2xl font-semibold mt-6">1. Information We Collect</h2>
//           <ul className="list-disc list-inside">
//             <li>Personal info: name, email, phone, address, gender</li>
//             <li>Medical details shared for consultations</li>
//             <li>Device & usage data: IP, browser type, interactions</li>
//           </ul>

//           <h2 className="text-2xl font-semibold mt-6">2. How We Use Your Data</h2>
//           <p>We use your data to:</p>
//           <ul className="list-disc list-inside">
//             <li>Facilitate appointments and consultations</li>
//             <li>Send notifications and updates</li>
//             <li>Improve user experience through analytics</li>
//           </ul>

//           <h2 className="text-2xl font-semibold mt-6">3. Data Sharing & Security</h2>
//           <ul className="list-disc list-inside">
//             <li>We never sell your data</li>
//             <li>We use secure protocols for data transfer and storage</li>
//             <li>Only authorized personnel access sensitive data</li>
//           </ul>

//           <h2 className="text-2xl font-semibold mt-6">4. Cookies</h2>
//           <p>
//             We use cookies to enhance functionality and understand user
//             behavior. You can manage cookies in your browser settings.
//           </p>

//           <h2 className="text-2xl font-semibold mt-6">5. Your Rights</h2>
//           <ul className="list-disc list-inside">
//             <li>Access, update or delete your data anytime</li>
//             <li>Opt-out of non-essential communications</li>
//             <li>Request a copy of the data we store</li>
//           </ul>

//           <p className="mt-10 italic">
//             For questions, contact us at support@medisetu.com
//           </p>
//         </section>
//       </motion.div>
//     </main>
//   );
// }

"use client"
import React from "react";
import { motion } from "framer-motion";
import { FaUserShield, FaLock, FaCookieBite, FaClipboardList , FaUserEdit } from "react-icons/fa";

export default function PrivacyPolicy() {
  return (
    <main className="p-4 md:p-16 max-w-4xl mx-auto text-gray-700">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#2563EB] mb-6 flex items-center gap-3">
          <FaUserShield className="text-[#2563EB] animate-[tilt_2s_ease-in-out_infinite]" /> Privacy Policy
        </h1>

        <section className="space-y-4">
          <p>
            Welcome to <span className="text-[#2563EB] font-semibold">MediSetu</span>. This Privacy Policy describes how we collect,
            use, and protect your information when you use our platform.
          </p>

          <h2 className="text-2xl font-semibold mt-6 flex items-center gap-2">
            <FaUserEdit className="text-[#2563EB] animate-[tilt_2s_ease-in-out_infinite]" /> 1. Information We Collect
          </h2>
          <ul className="list-disc list-inside">
            <li>Personal info: name, email, phone, address, gender</li>
            <li>Medical details shared for consultations</li>
            <li>Device & usage data: IP, browser type, interactions</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 flex items-center gap-2">
            <FaClipboardList  className="text-[#2563EB] animate-[tilt_2s_ease-in-out_infinite]" /> 2. How We Use Your Data
          </h2>
          <p>We use your data to:</p>
          <ul className="list-disc list-inside">
            <li>Facilitate appointments and consultations</li>
            <li>Send notifications and updates</li>
            <li>Improve user experience through analytics</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 flex items-center gap-2">
            <FaLock className="text-[#2563EB] animate-[tilt_2s_ease-in-out_infinite]" /> 3. Data Sharing & Security
          </h2>
          <ul className="list-disc list-inside">
            <li>We never sell your data</li>
            <li>We use secure protocols for data transfer and storage</li>
            <li>Only authorized personnel access sensitive data</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 flex items-center gap-2">
            <FaCookieBite className="text-[#2563EB] animate-[tilt_2s_ease-in-out_infinite]" /> 4. Cookies
          </h2>
          <p>
            We use cookies to enhance functionality and understand user
            behavior. You can manage cookies in your browser settings.
          </p>

          <h2 className="text-2xl font-semibold mt-6 flex items-center gap-2">
            <FaUserShield className="text-[#2563EB] animate-[tilt_2s_ease-in-out_infinite]" /> 5. Your Rights
          </h2>
          <ul className="list-disc list-inside">
            <li>Access, update or delete your data anytime</li>
            <li>Opt-out of non-essential communications</li>
            <li>Request a copy of the data we store</li>
          </ul>

          <p className="mt-10 italic">
            For questions, contact us at <a href="mailto:support@medisetu.com" className="text-blue-600 underline">support@medisetu.com</a>
          </p>
        </section>
      </motion.div>
    </main>
  );
}
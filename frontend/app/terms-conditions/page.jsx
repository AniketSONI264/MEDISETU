// import React from "react";
// import { motion } from "framer-motion";
// import {
//   FaGavel,
//   FaUserCheck,
//   FaBriefcaseMedical,
//   FaMoneyBillWave,
//   FaBan,
//   FaCopyright,
//   FaEdit,
// } from "react-icons/fa";

// // Animation variant for tilting icons
// const tiltAnimation = {
//   initial: { rotate: 0 },
//   animate: {
//     rotate: [0, -10, 10, -10, 10, 0],
//     transition: {
//       duration: 1.5,
//       ease: "easeInOut",
//       repeat: Infinity,
//     },
//   },
// };

// export default function TermsAndConditions() {
//   return (
//     <main className="p-4 md:p-16 max-w-4xl mx-auto text-gray-700 mt-[100px] mb-[100px]">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <h1 className="text-4xl md:text-5xl font-bold text-teal-700 mb-6 flex items-center gap-3">
//           <motion.span variants={tiltAnimation} initial="initial" animate="animate">
//             <FaGavel className="text-teal-500" />
//           </motion.span>
//           Terms & Conditions
//         </h1>

//         <section className="space-y-4">
//           <p>
//             These Terms govern your use of <span className="font-semibold text-teal-600">MediSetu</span>'s services. By accessing or
//             using our platform, you agree to abide by them fully.
//           </p>

//           <h2 className="text-2xl font-semibold mt-6 flex items-center gap-2">
//             <motion.span variants={tiltAnimation} initial="initial" animate="animate">
//               <FaUserCheck className="text-green-500" />
//             </motion.span>
//             1. Use of the Platform
//           </h2>
//           <ul className="list-disc list-inside">
//             <li>You must provide accurate and complete registration details</li>
//             <li>Only authorized users may access the platform's features</li>
//             <li>You agree not to misuse, hack, or disrupt services intentionally</li>
//           </ul>

//           <h2 className="text-2xl font-semibold mt-6 flex items-center gap-2">
//             <motion.span variants={tiltAnimation} initial="initial" animate="animate">
//               <FaBriefcaseMedical className="text-red-500" />
//             </motion.span>
//             2. Medical Disclaimer
//           </h2>
//           <p>
//             <span className="font-semibold text-teal-600">MediSetu</span> is not a substitute for emergency medical attention. Our
//             services are for routine consultations, and users must call local authorities during medical emergencies.
//           </p>

//           <h2 className="text-2xl font-semibold mt-6 flex items-center gap-2">
//             <motion.span variants={tiltAnimation} initial="initial" animate="animate">
//               <FaMoneyBillWave className="text-yellow-600" />
//             </motion.span>
//             3. Payments & Refunds
//           </h2>
//           <ul className="list-disc list-inside">
//             <li>All consultation payments are processed via Razorpay</li>
//             <li>Refunds are subject to admin review and will be initiated within 5 working days</li>
//           </ul>

//           <h2 className="text-2xl font-semibold mt-6 flex items-center gap-2">
//             <motion.span variants={tiltAnimation} initial="initial" animate="animate">
//               <FaBan className="text-pink-600" />
//             </motion.span>
//             4. Account Suspension
//           </h2>
//           <p>
//             We reserve the right to suspend accounts for policy violations, suspicious activity, or unauthorized access.
//           </p>

//           <h2 className="text-2xl font-semibold mt-6 flex items-center gap-2">
//             <motion.span variants={tiltAnimation} initial="initial" animate="animate">
//               <FaCopyright className="text-indigo-600" />
//             </motion.span>
//             5. Intellectual Property
//           </h2>
//           <ul className="list-disc list-inside">
//             <li>
//               <span className="font-semibold text-teal-600">MediSetu</span> logos, content, and design are proprietary
//             </li>
//             <li>You may not use or reproduce materials without written consent</li>
//           </ul>

//           <h2 className="text-2xl font-semibold mt-6 flex items-center gap-2">
//             <motion.span variants={tiltAnimation} initial="initial" animate="animate">
//               <FaEdit className="text-gray-600" />
//             </motion.span>
//             6. Modifications
//           </h2>
//           <p>
//             We may update these Terms at any time. Continued use of <span className="font-semibold text-teal-600">MediSetu</span> after
//             changes implies acceptance of the updated Terms.
//           </p>

//           <p className="mt-10 italic">
//             Questions? Email us at{" "}
//             <a href="mailto:legal@medisetu.com" className="text-teal-700 font-medium">
//               legal@medisetu.com
//             </a>
//           </p>
//         </section>
//       </motion.div>
//     </main>
//   );
// }



// // components/pages/TermsAndConditions.jsx
// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import {
//   FaGavel,
//   FaUserCheck,
//   FaBriefcaseMedical,
//   FaMoneyBillWave,
//   FaBan,
//   FaCopyright,
//   FaEdit,
// } from "react-icons/fa";

// // Tilt animation for all icons
// const tiltIconAnimation = {
//   initial: { rotate: 0 },
//   animate: {
//     rotate: [0, -10, 10, -10, 10, 0],
//     transition: {
//       duration: 1.5,
//       ease: "easeInOut",
//       repeat: Infinity,
//     },
//   },
// };

// // Reusable Heading Section Component
// const SectionHeading = ({ icon: Icon, color, title }) => (
//   <h2 className="text-2xl font-semibold mt-10 flex items-center gap-2 text-gray-800">
//     <motion.span variants={tiltIconAnimation} initial="initial" animate="animate">
//       <Icon className={`text-${color}-500`} />
//     </motion.span>
//     {title}
//   </h2>
// );

// export default function TermsAndConditions() {
//   return (
//     <main className="px-4 sm:px-10 lg:px-24 py-10 max-w-5xl mx-auto mt-[100px] mb-[100px] text-gray-700">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <h1 className="text-4xl sm:text-5xl font-bold text-teal-700 mb-8 flex items-center gap-3">
//           <motion.span variants={tiltIconAnimation} initial="initial" animate="animate">
//             <FaGavel className="text-teal-600" />
//           </motion.span>
//           Terms & Conditions
//         </h1>

//         <section className="space-y-6 text-[17px] leading-relaxed">
//           <p>
//             These Terms govern your use of{" "}
//             <span className="font-semibold text-teal-600">MediSetu</span>'s services. By accessing or using our platform,
//             you agree to abide by them fully.
//           </p>

//           <SectionHeading icon={FaUserCheck} color="green" title="1. Use of the Platform" />
//           <ul className="list-disc list-inside ml-2">
//             <li>You must provide accurate and complete registration details.</li>
//             <li>Only authorized users may access the platform's features.</li>
//             <li>You agree not to misuse, hack, or disrupt services intentionally.</li>
//           </ul>

//           <SectionHeading icon={FaBriefcaseMedical} color="red" title="2. Medical Disclaimer" />
//           <p>
//             <span className="font-semibold text-teal-600">MediSetu</span> is not a substitute for emergency medical
//             attention. Our services are for routine consultations. Call local emergency services during crises.
//           </p>

//           <SectionHeading icon={FaMoneyBillWave} color="yellow" title="3. Payments & Refunds" />
//           <ul className="list-disc list-inside ml-2">
//             <li>All payments are securely processed via Razorpay.</li>
//             <li>Refunds (if applicable) are reviewed by admins and processed within 5 working days.</li>
//           </ul>

//           <SectionHeading icon={FaBan} color="pink" title="4. Account Suspension" />
//           <p>
//             We reserve the right to suspend accounts in case of policy violations, fraudulent behavior, or unauthorized
//             access attempts.
//           </p>

//           <SectionHeading icon={FaCopyright} color="indigo" title="5. Intellectual Property" />
//           <ul className="list-disc list-inside ml-2">
//             <li>
//               <span className="font-semibold text-teal-600">MediSetu</span>'s logos, content, and design are proprietary.
//             </li>
//             <li>You may not use or reproduce platform materials without written consent.</li>
//           </ul>

//           <SectionHeading icon={FaEdit} color="gray" title="6. Modifications" />
//           <p>
//             We may update these Terms at any time. Continued use of{" "}
//             <span className="font-semibold text-teal-600">MediSetu</span> implies your acceptance of those changes.
//           </p>

//           <p className="mt-10 italic">
//             Still have questions? Reach out to us at{" "}
//             <a
//               href="mailto:legal@medisetu.com"
//               className="text-teal-700 font-medium underline hover:text-teal-900"
//             >
//               legal@medisetu.com
//             </a>
//           </p>
//         </section>
//       </motion.div>
//     </main>
//   );
// }




"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
// import html2pdf from "html2pdf.js";
import {
  FaDownload,
  FaGavel,
  FaUserCheck,
  FaBriefcaseMedical,
  FaMoneyBillWave,
  FaBan,
  FaCopyright,
  FaEdit,
} from "react-icons/fa";

// 💫 Reusable Animated Icon Component
const AnimatedIcon = ({ Icon }) => (
  <motion.div
    animate={{ rotate: [-10, 10, -10] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    className="text-3xl md:text-4xl text-teal-700"
  >
    <Icon />
  </motion.div>
);

// 📌 TL;DR Snapshot
const TermsSummary = () => (
  <div className="bg-white rounded-xl p-5 border border-teal-200 shadow-md">
    <h3 className="text-lg font-semibold text-teal-700 mb-2">Summary</h3>
    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
      <li>Use MediSetu respectfully and ethically — no hacks, no tricks.</li>
      <li>It’s a healthcare assist tool, not emergency service. Call 911 for crises.</li>
      <li>We protect your data and IP. Don’t try to copy/paste and run.</li>
      <li>Violation = account suspension. You’ve been warned. 😎</li>
    </ul>
  </div>
);

// 📜 Section Heading with Animated Icon
const SectionHeading = ({ icon: Icon, title, color = "teal" }) => (
  <h2 className={`text-xl font-semibold mt-10 flex items-center gap-3 text-${color}-700`}>
    <AnimatedIcon Icon={Icon} />
    {title}
  </h2>
);

export default function TermsAndConditions() {
  const printRef = useRef();

//   const handlePDFDownload = () => {
//     const element = printRef.current;
//     const options = {
//       margin: 0.5,
//       filename: "MediSetu-TermsAndConditions.pdf",
//       image: { type: "jpeg", quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
//     };
//     html2pdf().set(options).from(element).save();
//   };
const handlePDFDownload = async () => {
    const element = printRef.current;
    if (!element) return;
  
    const html2pdf = (await import("html2pdf.js")).default;
  
    const opt = {
      margin: 0.5,
      filename: "MediSetu-PrivacyPolicy.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
  
    html2pdf().set(opt).from(element).save();
  };
  

  return (
    <main className="min-h-screen px-4 md:px-8 py-10 bg-gradient-to-br from-[#e3f2fd] via-[#f0f4ff] to-[#eaf6ff] text-gray-800 mt-[60px] mb-[140px]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto space-y-10"
        ref={printRef}
      >
        {/* 🏛️ Heading */}
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="text-3xl md:text-4xl font-bold text-teal-700 bg-white py-3 px-6 rounded-full shadow-lg inline-block border border-teal-300">
            MediSetu Terms & Conditions
          </div>
          <p className="text-gray-600 max-w-xl text-base md:text-lg">
            By using MediSetu, you’re agreeing to these terms. Don’t worry — we keep it human.
          </p>
          <button
            onClick={handlePDFDownload}
            className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-full flex items-center gap-2 shadow-md cursor-pointer "
          >
            <FaDownload />
            Download PDF
          </button>
        </div>

        {/* 🔍 Summary Section */}
        <TermsSummary />

        {/* 📋 Full Terms */}
        <section className="space-y-6 text-[17px] leading-relaxed bg-white p-6 rounded-xl shadow border border-teal-100">
          <p>
            These Terms govern your use of{" "}
            <span className="font-semibold text-teal-600">MediSetu</span>'s services. By accessing or using our platform,
            you agree to abide by them fully.
          </p>

          <SectionHeading icon={FaUserCheck} color="green" title="1. Use of the Platform" />
          <ul className="list-disc list-inside ml-2">
            <li>Provide accurate and complete registration details.</li>
            <li>Only authorized users may access the platform's features.</li>
            <li>Do not misuse, hack, or intentionally disrupt services.</li>
          </ul>

          <SectionHeading icon={FaBriefcaseMedical} color="red" title="2. Medical Disclaimer" />
          <p>
            <span className="font-semibold text-teal-600">MediSetu</span> is not an emergency service. Use it for routine care. Call local emergency services during actual emergencies.
          </p>

          <SectionHeading icon={FaMoneyBillWave} color="yellow" title="3. Payments & Refunds" />
          <ul className="list-disc list-inside ml-2">
            <li>Payments are securely processed via Razorpay.</li>
            <li>Refunds are reviewed case-by-case and processed within 5 working days.</li>
          </ul>

          <SectionHeading icon={FaBan} color="pink" title="4. Account Suspension" />
          <p>
            We may suspend accounts for policy violations, fraud, or unauthorized access attempts. No second chances.
          </p>

          <SectionHeading icon={FaCopyright} color="indigo" title="5. Intellectual Property" />
          <ul className="list-disc list-inside ml-2">
            <li>
              The name, logo, content, and design of{" "}
              <span className="font-semibold text-teal-600">MediSetu</span> are proprietary.
            </li>
            <li>No unauthorized reproduction or distribution allowed.</li>
          </ul>

          <SectionHeading icon={FaEdit} color="gray" title="6. Modifications" />
          <p>
            We may update these Terms from time to time. Continued use of the platform = your acceptance of new terms.
          </p>

          <p className="mt-10 italic">
            Got questions? Hit us up at{" "}
            <a
              href="mailto:legal@medisetu.com"
              className="text-blue-700 font-medium underline hover:text-blue-900"
            >
              legal@medisetu.com
            </a>
          </p>
        </section>
      </motion.div>
    </main>
  );
}

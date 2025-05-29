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

// "use client"
// import React from "react";
// import { motion } from "framer-motion";
// import { FaUserShield, FaLock, FaCookieBite, FaClipboardList , FaUserEdit } from "react-icons/fa";

// export default function PrivacyPolicy() {
//   return (
//     <main className="p-4 md:p-16 max-w-4xl mx-auto text-gray-700 mb-[150px] mt-[80px]"> 
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <h1 className="text-4xl md:text-5xl font-bold text-teal-500 mb-6 flex items-center gap-3">
//           <FaUserShield className="text-teal-500 animate-[tilt_2s_ease-in-out_infinite]" /> Privacy Policy
//         </h1>

//         <section className="space-y-4">
//           <p>
//             Welcome to <span className="text-teal-500 font-semibold">MediSetu</span>. This Privacy Policy describes how we collect,
//             use, and protect your information when you use our platform.
//           </p>

//           <h2 className="text-2xl font-semibold mt-6 flex items-center gap-2">
//             <FaUserEdit className="text-teal-500 animate-[tilt_2s_ease-in-out_infinite]" /> 1. Information We Collect
//           </h2>
//           <ul className="list-disc list-inside">
//             <li>Personal info: name, email, phone, address, gender</li>
//             <li>Medical details shared for consultations</li>
//             <li>Device & usage data: IP, browser type, interactions</li>
//           </ul>

//           <h2 className="text-2xl font-semibold mt-6 flex items-center gap-2">
//             <FaClipboardList  className="text-teal-500 animate-[tilt_2s_ease-in-out_infinite]" /> 2. How We Use Your Data
//           </h2>
//           <p>We use your data to:</p>
//           <ul className="list-disc list-inside">
//             <li>Facilitate appointments and consultations</li>
//             <li>Send notifications and updates</li>
//             <li>Improve user experience through analytics</li>
//           </ul>

//           <h2 className="text-2xl font-semibold mt-6 flex items-center gap-2">
//             <FaLock className="text-teal-500 animate-[tilt_2s_ease-in-out_infinite]" /> 3. Data Sharing & Security
//           </h2>
//           <ul className="list-disc list-inside">
//             <li>We never sell your data</li>
//             <li>We use secure protocols for data transfer and storage</li>
//             <li>Only authorized personnel access sensitive data</li>
//           </ul>

//           <h2 className="text-2xl font-semibold mt-6 flex items-center gap-2">
//             <FaCookieBite className="text-teal-500 animate-[tilt_2s_ease-in-out_infinite]" /> 4. Cookies
//           </h2>
//           <p>
//             We use cookies to enhance functionality and understand user
//             behavior. You can manage cookies in your browser settings.
//           </p>

//           <h2 className="text-2xl font-semibold mt-6 flex items-center gap-2">
//             <FaUserShield className="text-teal-500 animate-[tilt_2s_ease-in-out_infinite]" /> 5. Your Rights
//           </h2>
//           <ul className="list-disc list-inside">
//             <li>Access, update or delete your data anytime</li>
//             <li>Opt-out of non-essential communications</li>
//             <li>Request a copy of the data we store</li>
//           </ul>

//           <p className="mt-10 italic">
//             For questions, contact us at <a href="mailto:support@medisetu.com" className="text-blue-600 underline">support@medisetu.com</a>
//           </p>
//         </section>
//       </motion.div>
//     </main>
//   );
// }





// "use client";
// import React from "react";
// import { motion } from "framer-motion";
// import {
//   FaUserShield,
//   FaLock,
//   FaCookieBite,
//   FaClipboardList,
//   FaUserEdit,
// } from "react-icons/fa";

// const AnimatedIcon = ({ Icon }) => (
//   <motion.div
//     animate={{ rotate: [-10, 10, -10] }}
//     transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
//     className="flex items-center justify-center text-teal-600 text-4xl md:text-5xl"
//   >
//     <Icon className="w-10 h-10 md:w-12 md:h-12" />
//   </motion.div>
// );

// export default function PrivacyPolicy() {
//   return (
//     <main className="min-h-screen px-4 md:px-16 py-12 bg-gradient-to-br from-[#c2f7f7] via-[#dafaf3] to-[#e0ffe0] text-gray-700">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="max-w-4xl mx-auto mb-[100px]"
//       >
//         <div className="flex items-center gap-4 mb-8">
//           <AnimatedIcon Icon={FaUserShield} />
//           <h1 className="text-4xl md:text-5xl font-bold text-teal-600">
//             Privacy Policy
//           </h1>
//         </div>

//         <section className="space-y-8 prose prose-gray max-w-none">
//           <p>
//             Welcome to <span className="text-teal-600 font-semibold">MediSetu</span>. This Privacy Policy describes how we collect,
//             use, and protect your information when you use our platform.
//           </p>

//           <div>
//             <h2 className="flex items-center gap-2 text-2xl font-semibold">
//               <AnimatedIcon Icon={FaUserEdit} /> 1. Information We Collect
//             </h2>
//             <ul className="list-disc list-inside">
//               <li>Personal info: name, email, phone, address, gender</li>
//               <li>Medical details shared for consultations</li>
//               <li>Device & usage data: IP, browser type, interactions</li>
//             </ul>
//           </div>

//           <div>
//             <h2 className="flex items-center gap-2 text-2xl font-semibold">
//               <AnimatedIcon Icon={FaClipboardList} /> 2. How We Use Your Data
//             </h2>
//             <p>We use your data to:</p>
//             <ul className="list-disc list-inside">
//               <li>Facilitate appointments and consultations</li>
//               <li>Send notifications and updates</li>
//               <li>Improve user experience through analytics</li>
//             </ul>
//           </div>

//           <div>
//             <h2 className="flex items-center gap-2 text-2xl font-semibold">
//               <AnimatedIcon Icon={FaLock} /> 3. Data Sharing & Security
//             </h2>
//             <ul className="list-disc list-inside">
//               <li>We never sell your data</li>
//               <li>We use secure protocols for data transfer and storage</li>
//               <li>Only authorized personnel access sensitive data</li>
//             </ul>
//           </div>

//           <div>
//             <h2 className="flex items-center gap-2 text-2xl font-semibold">
//               <AnimatedIcon Icon={FaCookieBite} /> 4. Cookies
//             </h2>
//             <p>
//               We use cookies to enhance functionality and understand user
//               behavior. You can manage cookies in your browser settings.
//             </p>
//           </div>

//           <div>
//             <h2 className="flex items-center gap-2 text-2xl font-semibold">
//               <AnimatedIcon Icon={FaUserShield} /> 5. Your Rights
//             </h2>
//             <ul className="list-disc list-inside">
//               <li>Access, update or delete your data anytime</li>
//               <li>Opt-out of non-essential communications</li>
//               <li>Request a copy of the data we store</li>
//             </ul>
//           </div>

//           <p className="mt-12 italic">
//             For questions, contact us at{" "}
//             <a
//               href="mailto:support@medisetu.com"
//               className="text-blue-600 underline"
//             >
//               support@medisetu.com
//             </a>
//           </p>
//         </section>
//       </motion.div>
//     </main>
//   );
// }



// "use client";
// import React from "react";
// import { motion } from "framer-motion";
// import {
//   FaUserShield,
//   FaLock,
//   FaCookieBite,
//   FaClipboardList,
//   FaUserEdit,
// } from "react-icons/fa";

// const AnimatedIcon = ({ Icon }) => (
//   <motion.div
//     animate={{ rotate: [-10, 10, -10] }}
//     transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
//     className="flex items-center justify-center text-gradient text-white text-4xl md:text-5xl"
//   >
//     <Icon className="w-10 h-10 md:w-12 md:h-12" />
//   </motion.div>
// );

// export default function PrivacyPolicy() {
//   return (
//     <main className="min-h-screen px-4 md:px-8 py-12 bg-gradient-to-br from-[#d0f1f1] via-[#f0faf6] to-[#eaffea] text-gray-800">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="max-w-5xl mx-auto"
//       >
//         {/* HEADER */}
//         <div className="flex flex-col items-center text-center mb-16">
//           <div className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-4 rounded-full font-bold shadow-lg hover:scale-105 transition duration-300">
//             <FaUserShield className="text-2xl" />
//             <h1 className="text-3xl md:text-4xl tracking-wide font-semibold">
//               Privacy Policy
//             </h1>
//           </div>
//           <p className="mt-4 text-gray-600 max-w-2xl text-base md:text-lg">
//             Learn how <span className="text-teal-600 font-bold">MediSetu</span> handles your data with responsibility and transparency.
//           </p>
//         </div>

//         {/* CARD STYLE CONTAINER */}
//         <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-12 space-y-12 border border-teal-100">
//           {/* Section 1 */}
//           <motion.section
//             initial={{ opacity: 0, x: -30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//             className="space-y-4"
//           >
//             <h2 className="flex items-center gap-3 text-2xl font-semibold text-teal-700">
//               <AnimatedIcon Icon={FaUserEdit} /> 1. Information We Collect
//             </h2>
//             <ul className="list-disc list-inside text-gray-700">
//               <li>Personal info: name, email, phone, address, gender</li>
//               <li>Medical details shared for consultations</li>
//               <li>Device & usage data: IP, browser type, interactions</li>
//             </ul>
//           </motion.section>

//           {/* Section 2 */}
//           <motion.section
//             initial={{ opacity: 0, x: 30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//             className="space-y-4"
//           >
//             <h2 className="flex items-center gap-3 text-2xl font-semibold text-teal-700">
//               <AnimatedIcon Icon={FaClipboardList} /> 2. How We Use Your Data
//             </h2>
//             <ul className="list-disc list-inside text-gray-700">
//               <li>Facilitate appointments and consultations</li>
//               <li>Send notifications and updates</li>
//               <li>Improve user experience through analytics</li>
//             </ul>
//           </motion.section>

//           {/* Section 3 */}
//           <motion.section
//             initial={{ opacity: 0, x: -30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//             className="space-y-4"
//           >
//             <h2 className="flex items-center gap-3 text-2xl font-semibold text-teal-700">
//               <AnimatedIcon Icon={FaLock} /> 3. Data Sharing & Security
//             </h2>
//             <ul className="list-disc list-inside text-gray-700">
//               <li>We never sell your data</li>
//               <li>We use secure protocols for data transfer and storage</li>
//               <li>Only authorized personnel access sensitive data</li>
//             </ul>
//           </motion.section>

//           {/* Section 4 */}
//           <motion.section
//             initial={{ opacity: 0, x: 30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//             className="space-y-4"
//           >
//             <h2 className="flex items-center gap-3 text-2xl font-semibold text-teal-700">
//               <AnimatedIcon Icon={FaCookieBite} /> 4. Cookies
//             </h2>
//             <p className="text-gray-700">
//               We use cookies to enhance functionality and understand user behavior. You can manage cookies in your browser settings.
//             </p>
//           </motion.section>

//           {/* Section 5 */}
//           <motion.section
//             initial={{ opacity: 0, x: -30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//             className="space-y-4"
//           >
//             <h2 className="flex items-center gap-3 text-2xl font-semibold text-teal-700">
//               <AnimatedIcon Icon={FaUserShield} /> 5. Your Rights
//             </h2>
//             <ul className="list-disc list-inside text-gray-700">
//               <li>Access, update or delete your data anytime</li>
//               <li>Opt-out of non-essential communications</li>
//               <li>Request a copy of the data we store</li>
//             </ul>
//           </motion.section>

//           {/* Contact */}
//           <div className="text-center pt-6 border-t border-gray-200">
//             <p className="italic text-sm text-gray-500">
//               Questions? Reach out to us at{" "}
//               <a
//                 href="mailto:support@medisetu.com"
//                 className="text-blue-600 underline font-medium"
//               >
//                 support@medisetu.com
//               </a>
//             </p>
//           </div>
//         </div>
//       </motion.div>
//     </main>
//   );
// }


 


// "use client";
// import React, { useRef } from "react";
// import { motion } from "framer-motion";
// import Lottie from "lottie-react";
// // import lockAnimation from "@/public/lotties/lock-doc.json"; // Add your Lottie JSON here
// import html2pdf from "html2pdf.js";
// import {
//   FaDownload,
//   FaUserShield,
//   FaLock,
//   FaCookieBite,
//   FaClipboardList,
//   FaUserEdit,
// } from "react-icons/fa";

// // Reusable Animated Icon
// const AnimatedIcon = ({ Icon }) => (
//   <motion.div
//     animate={{ rotate: [-10, 10, -10] }}
//     transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
//     className="flex items-center justify-center text-gradient text-4xl md:text-5xl"
//   >
//     <Icon className="w-10 h-10 md:w-12 md:h-12" />
//   </motion.div>
// );

// // TL;DR Summary
// const PrivacySnapshot = () => (
//   <div className="bg-white rounded-xl p-5 border border-teal-200 shadow-md">
//     <h3 className="text-lg font-semibold text-teal-700 mb-2">TL;DR Summary</h3>
//     <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
//       <li>We collect your personal and medical data only to improve your healthcare experience.</li>
//       <li>We don't sell your data. It's used to manage appointments and personalize content.</li>
//       <li>All data is stored securely and only accessed by authorized personnel.</li>
//       <li>You can update, delete, or request your data anytime.</li>
//     </ul>
//   </div>
// );

// export default function PrivacyPolicy() {
//   const printRef = useRef();

//   const handlePDFDownload = () => {
//     const element = printRef.current;
//     const opt = {
//       margin: 0.5,
//       filename: "MediSetu-PrivacyPolicy.pdf",
//       image: { type: "jpeg", quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
//     };
//     html2pdf().set(opt).from(element).save();
//   };

//   return (
//     <main className="min-h-screen px-4 md:px-8 py-10 bg-gradient-to-br from-[#d0f1f1] via-[#f0faf6] to-[#eaffea] text-gray-800">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="max-w-5xl mx-auto space-y-10"
//         ref={printRef}
//       >
//         {/* 🔒 Lottie Header Banner */}
//         <div className="flex flex-col items-center text-center space-y-6">
//           {/* <div className="w-36 md:w-52">
//             <Lottie animationData={lockAnimation} loop />
//           </div> */}
//           <div className="text-3xl md:text-4xl font-bold text-teal-600 bg-white py-3 px-6 rounded-full shadow-lg inline-block border border-teal-300">
//             MediSetu Privacy Policy
//           </div>
//           <p className="text-gray-600 max-w-xl text-base md:text-lg">
//             Your privacy is our priority. Here's how we handle and protect your data in MediSetu.
//           </p>
//           <button
//             onClick={handlePDFDownload}
//             className="mt-4 flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-full shadow-md transition"
//           >
//             <FaDownload /> Download PDF
//           </button>
//         </div>

//         {/* TLDR Summary */}
//         <PrivacySnapshot />

//         {/* Full Policy in Cards */}
//         <div className="bg-white shadow-2xl rounded-2xl p-6 md:p-10 space-y-10 border border-teal-100">
//           {/* Section 1 */}
//           <Section
//             title="1. Information We Collect"
//             icon={FaUserEdit}
//             points={[
//               "Personal info: name, email, phone, address, gender",
//               "Medical details shared for consultations",
//               "Device & usage data: IP, browser type, interactions",
//             ]}
//           />

//           {/* Section 2 */}
//           <Section
//             title="2. How We Use Your Data"
//             icon={FaClipboardList}
//             points={[
//               "Facilitate appointments and consultations",
//               "Send notifications and updates",
//               "Improve user experience through analytics",
//             ]}
//           />

//           {/* Section 3 */}
//           <Section
//             title="3. Data Sharing & Security"
//             icon={FaLock}
//             points={[
//               "We never sell your data",
//               "We use secure protocols for data transfer and storage",
//               "Only authorized personnel access sensitive data",
//             ]}
//           />

//           {/* Section 4 */}
//           <Section
//             title="4. Cookies"
//             icon={FaCookieBite}
//             description="We use cookies to enhance functionality and understand user behavior. You can manage cookies in your browser settings."
//           />

//           {/* Section 5 */}
//           <Section
//             title="5. Your Rights"
//             icon={FaUserShield}
//             points={[
//               "Access, update or delete your data anytime",
//               "Opt-out of non-essential communications",
//               "Request a copy of the data we store",
//             ]}
//           />
//         </div>

//         {/* Contact */}
//         <div className="text-center text-sm text-gray-500 italic mt-10">
//           Questions? Email us at{" "}
//           <a href="mailto:support@medisetu.com" className="text-blue-600 underline font-medium">
//             support@medisetu.com
//           </a>
//         </div>
//       </motion.div>
//     </main>
//   );
// }

// // 💡 Reusable Section Component
// const Section = ({ title, icon: Icon, points, description }) => (
//   <motion.section
//     initial={{ opacity: 0, y: 20 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5 }}
//     className="space-y-4"
//   >
//     <h2 className="flex items-center gap-3 text-2xl font-semibold text-teal-700">
//       <AnimatedIcon Icon={Icon} /> {title}
//     </h2>
//     {points && (
//       <ul className="list-disc list-inside text-gray-700">
//         {points.map((point, idx) => (
//           <li key={idx}>{point}</li>
//         ))}
//       </ul> 
//     )}
//     {description && <p className="text-gray-700">{description}</p>}
//   </motion.section>  
// );








"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
// import html2pdf from "html2pdf.js";
import {
  FaDownload,
  FaUserShield,
  FaLock,
  FaCookieBite,
  FaClipboardList,
  FaUserEdit,
} from "react-icons/fa";

// 🔁 Reusable Animated Icon (for that fancy Framer vibe)
const AnimatedIcon = ({ Icon }) => (
  <motion.div
    animate={{ rotate: [-10, 10, -10] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    className="flex items-center justify-center text-gradient text-4xl md:text-5xl"
  >
    <Icon className="w-10 h-10 md:w-12 md:h-12" />
  </motion.div>
);

// 📌 TL;DR Summary
const PrivacySnapshot = () => (
  <div className="bg-white rounded-xl p-5 border border-teal-200 shadow-md">
    <h3 className="text-lg font-semibold text-teal-700 mb-2">Summary</h3>
    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
      <li>We collect your personal and medical data only to improve your healthcare experience.</li>
      <li>We don't sell your data. It's used to manage appointments and personalize content.</li>
      <li>All data is stored securely and only accessed by authorized personnel.</li>
      <li>You can update, delete, or request your data anytime.</li>
    </ul>
  </div>
);

// 📃 Privacy Policy Page
export default function PrivacyPolicy() {
  const printRef = useRef();

  // const handlePDFDownload = () => {
  //   const element = printRef.current;
  //   const opt = {
  //     margin: 0.5,
  //     filename: "MediSetu-PrivacyPolicy.pdf",
  //     image: { type: "jpeg", quality: 0.98 },
  //     html2canvas: { scale: 2 },
  //     jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  //   };
  //   html2pdf().set(opt).from(element).save();
  // };
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
    <main className="min-h-screen px-4 md:px-8 py-10 bg-gradient-to-br from-[#d0f1f1] via-[#f0faf6] to-[#eaffea] text-gray-800 mt-[70 px] mb-[140px]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto space-y-10"
        ref={printRef}
      >
        {/* Header Banner */}
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="text-3xl md:text-4xl font-bold text-teal-600 bg-white py-3 px-6 rounded-full shadow-lg inline-block border border-teal-300">
            MediSetu Privacy Policy
          </div>
          <p className="text-gray-600 max-w-xl text-base md:text-lg">
            Your privacy is our priority. Here's how we handle and protect your data in MediSetu.
          </p>
          <button
            onClick={handlePDFDownload}
            className="mt-4 flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-full shadow-md transition cursor-pointer "
          >
            <FaDownload /> Download PDF
          </button>
        </div>

        {/* TLDR Summary */}
        <PrivacySnapshot />

        {/* Full Policy in Cards */}
        <div className="bg-white shadow-2xl rounded-2xl p-6 md:p-10 space-y-10 border border-teal-100">
          <Section
            title="1. Information We Collect"
            icon={FaUserEdit}
            points={[
              "Personal info: name, email, phone, address, gender",
              "Medical details shared for consultations",
              "Device & usage data: IP, browser type, interactions",
            ]}
          />
          <Section
            title="2. How We Use Your Data"
            icon={FaClipboardList}
            points={[
              "Facilitate appointments and consultations",
              "Send notifications and updates",
              "Improve user experience through analytics",
            ]}
          />
          <Section
            title="3. Data Sharing & Security"
            icon={FaLock}
            points={[
              "We never sell your data",
              "We use secure protocols for data transfer and storage",
              "Only authorized personnel access sensitive data",
            ]}
          />
          <Section
            title="4. Cookies"
            icon={FaCookieBite}
            color="red"
            description="We use cookies to enhance functionality and understand user behavior. You can manage cookies in your browser settings."
          />
          
          {/* <SectionHeading icon={FaUserCheck} color="green" title="1. Use of the Platform" /> */}
          <Section
            title="5. Your Rights"
            icon={FaUserShield}
            color="green"
            points={[
              "Access, update or delete your data anytime",
              "Opt-out of non-essential communications",
              "Request a copy of the data we store",
            ]}
          />
        </div>

        {/* Contact Info */}
        <div className="text-center text-sm text-gray-500 italic mt-10">
          Questions? Email us at{" "}
          <a href="mailto:support@medisetu.com" className="text-blue-600 underline font-medium">
            support@medisetu.com
          </a>
        </div>
      </motion.div>
    </main>
  );
}

// 🧩 Reusable Section Component
const Section = ({ title, icon: Icon, points, description }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="space-y-4"
  >
    <h2 className="flex items-center gap-3 text-2xl font-semibold text-teal-700">
      <AnimatedIcon Icon={Icon} /> {title}
    </h2>
    {points && (
      <ul className="list-disc list-inside text-gray-700">
        {points.map((point, idx) => (
          <li key={idx}>{point}</li>
        ))}
      </ul>
    )}
    {description && <p className="text-gray-700">{description}</p>}
  </motion.section>
);

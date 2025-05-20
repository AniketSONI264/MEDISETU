// "use client";
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronDown, ChevronUp } from "lucide-react";
 
// const faqData = [
//   {
//     question: "What is MediSetu?",
//     answer: "  MediSetu is an online healthcare platform that connects patients with top doctors for consultations, appointments, and virtual healthcare services.   ",
//   },
//   {
//     question: "How do I book an appointment?",
//     answer: "  You can book an appointment by selecting your preferred doctor, choosing a date and time, and confirming your booking through our website or app.   ",
//   },
//   {
//     question: "Are online consultations available?",
//     answer: "  Yes! MediSetu offers secure and private online video consultations with certified doctors to help you get the best medical advice from home.   ",
//   },
//   {
//     question: "Can I access my medical records?",
//     answer: "  Yes, all your medical history, prescriptions, and reports are securely stored in your MediSetu account for easy access.  ",
//   },
//   {
//     question: "What payment methods are accepted?",
//     answer: "  We accept online payments via UPI, debit/credit cards, net banking, and MediSetu Wallet for a seamless transaction experience.   ",
//   },
// ];

// export default function FAQPage() {
//   const [openIndex, setOpenIndex] = useState(null);
//   const [typedText, setTypedText] = useState("");
//   const [intervalId, setIntervalId] = useState(null);

//   useEffect(() => {
//     if (openIndex !== null) {
//       clearInterval(intervalId); // Clear any previous intervals before starting new one
//       setTypedText(""); // Reset typed text

//       const text = faqData[openIndex]?.answer || ""; // Ensure valid text
//       let i = 0;

//       const interval = setInterval(() => {
//         if (i < text.length) {
//           setTypedText((prev) => prev + text[i]);
//           i++;
//         } else {
//           clearInterval(interval);
//         }
//       }, 20); // Speed of typing (Lower = faster)

//       setIntervalId(interval);

//       return () => clearInterval(interval); // Cleanup interval when component unmounts or FAQ changes
//     } else {
//       setTypedText(""); // Reset text when no FAQ is open
//     }
//   }, [openIndex]);

//   const toggleFAQ = (index) => {
//     if (intervalId) {
//       clearInterval(intervalId); // Clear existing interval before opening a new FAQ
//     }

//     if (openIndex === index) {
//       setOpenIndex(null);
//       setTypedText(""); // Ensure text is cleared properly
//     } else {
//       setOpenIndex(index);
//     }
//   };

//   return (
//     <main className="min-h-screen  flex flex-col items-center py-10 px-6">
//       <motion.h1
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3, ease: "easeOut" }}
//         className="text-4xl font-bold text-teal-700 mb-6"
//       >
//         Frequently Asked Questions
//       </motion.h1>

//       <div className="w-full max-w-3xl space-y-4">
//         {faqData.map((faq, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: index * 0.05 }}
//             className="bg-white shadow-md rounded-xl overflow-hidden"
//           >
//             <button
//               className="w-full flex justify-between items-center py-4 px-6 text-lg font-semibold text-black-700 hover:bg-teal-100 transition-all duration-150"
//               onClick={() => toggleFAQ(index)}
//             >
//               {faq.question}
//               <motion.div
//                 animate={{ rotate: openIndex === index ? 180 : 0 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 {openIndex === index ? (
//                   <ChevronUp className="w-6 h-6 text-teal-600" />
//                 ) : (
//                   <ChevronDown className="w-6 h-6 text-teal-600" />
//                 )}
//               </motion.div>
//             </button>

//             <AnimatePresence>
//               {openIndex === index && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.2 }}
//                   className="px-6 pb-4 text-gray-600"
//                 >
//                   {typedText}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>
//         ))}
//       </div>
//     </main>
//   );
// }
 



// "use client";
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronDown, ChevronUp } from "lucide-react";

// const faqData = [
//   {
//     question: "What is MediSetu?",
//     answer: "MediSetu is an online healthcare platform that connects patients with top doctors for consultations, appointments, and virtual healthcare services.",
//   },
//   {
//     question: "How do I book an appointment?",
//     answer: "You can book an appointment by selecting your preferred doctor, choosing a date and time, and confirming your booking through our website or app.",
//   },
//   {
//     question: "Are online consultations available?",
//     answer: "Yes! MediSetu offers secure and private online video consultations with certified doctors to help you get the best medical advice from home.",
//   },
//   {
//     question: "Can I access my medical records?",
//     answer: "Yes, all your medical history, prescriptions, and reports are securely stored in your MediSetu account for easy access.",
//   },
//   {
//     question: "What payment methods are accepted?",
//     answer: "We accept online payments via UPI, debit/credit cards, net banking, and MediSetu Wallet for a seamless transaction experience.",
//   },
// ];

// export default function FAQPage() {
//   const [openIndex, setOpenIndex] = useState(null);
//   const [typedText, setTypedText] = useState("");

//   useEffect(() => {
//     if (openIndex !== null) {
//       setTypedText("");
//       const text = faqData[openIndex]?.answer || "";
//       let i = 0;
//       const interval = setInterval(() => {
//         if (i < text.length) {
//           setTypedText((prev) => prev + text[i]);
//           i++;
//         } else {
//           clearInterval(interval);
//         }
//       }, 15); // Faster typing speed
//       return () => clearInterval(interval);
//     } else {
//       setTypedText(""); // Reset when no question is open
//     }
//   }, [openIndex]);

//   const toggleFAQ = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <main className="min-h-screen flex flex-col items-center py-10 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-teal-50 to-white rounded-lg">
//       {/* Title */}
//       <motion.h1
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3, ease: "easeOut" }}
//         className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-700 mb-6 text-center"
//       >
//         Frequently Asked Questions
//       </motion.h1>

//       {/* FAQ Container */}
//       <div className="w-full max-w-4xl space-y-4">
//         {faqData.map((faq, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: index * 0.05 }}
//             className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
//           >
//             {/* Question Button */}
//             {/* <button
//               className="w-full flex justify-between items-center py-3 px-4 sm:py-4 sm:px-6 text-sm sm:text-lg md:text-xl font-semibold   text-gray-600 hover:bg-teal-100 transition-all duration-150"
//               onClick={() => toggleFAQ(index)}
//             > */}
//             <button
//   className="w-full flex justify-between items-center py-3 px-4 sm:py-4 sm:px-6  text-sm sm:text-lg md:text-xl font-semibold text-gray-600 hover:bg-teal-100 transition-all duration-150 tracking-wide"
//   onClick={() => toggleFAQ(index)}
// >

//               <span>{faq.question}</span>
//               <motion.div
//                 animate={{ rotate: openIndex === index ? 180 : 0 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 {openIndex === index ? (
//                   <ChevronUp className="w-5 sm:w-6 h-5 sm:h-6 text-teal-600" />
//                 ) : (
//                   <ChevronDown className="w-5 sm:w-6 h-5 sm:h-6 text-teal-600" />
//                 )}
//               </motion.div>
//             </button>

//             {/* Answer Section */}
//             <AnimatePresence>
//               {openIndex === index && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: "auto" }}
//                   exit={{ opacity: 0, height: 0 }}
//                   transition={{ duration: 0.2 }}
//                   className="px-4 sm:px-6 pb-3 sm:pb-4 text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed"
//                 >
//                   {typedText}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>
//         ))}
//       </div>
//     </main>
//   );
// }








"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqData = [
  {
    question: "What is MediSetu?",
    answer:
      "MMediSetu is an online healthcare platform that connects patients with top doctors for consultations, appointments, and virtual healthcare services.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "YYou can book an appointment by selecting your preferred doctor, choosing a date and time, and confirming your booking through our website or app.",
  },
  {
    question: "Are online consultations available?",
    answer:
      "YYes! MediSetu offers secure and private online video consultations with certified doctors to help you get the best medical advice from home.",
  },
  {
    question: "Can I access my medical records?",
    answer:
      "YYes, all your medical history, prescriptions, and reports are securely stored in your MediSetu account for easy access.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "WWe accept online payments via UPI, debit/credit cards, net banking, and MediSetu Wallet for a seamless transaction experience.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [typedText, setTypedText] = useState("");

  // useEffect(() => {
  //   if (openIndex !== null) {
  //     setTypedText("");
  //     const text = faqData[openIndex]?.answer || "";
  //     let i = 0;
  //     const interval = setInterval(() => {
  //       if (i < text.length) {
  //         setTypedText((prev) => prev + text[i]);
  //         i++;
  //       } else {
  //         clearInterval(interval);
  //       }
  //     }, 10);
  //     return () => clearInterval(interval);
  //   } else {
  //     setTypedText("");
  //   }
  // }, [openIndex]);

  useEffect(() => {
    let interval;
    
    if (openIndex !== null) {
      setTypedText(""); // Reset before typing
      const text = faqData[openIndex]?.answer || "";
      let i = 0;
  
      interval = setInterval(() => {
        if (i < text.length) {
          // Using functional state update to ensure we append correctly
          setTypedText((prev) => prev + text.charAt(i)); // this ensures the first character is added correctly
          i++;
        } else {
          clearInterval(interval);
        }
      }, 10); // Speed of typing
    }
  
    return () => clearInterval(interval); // Clean up on unmount or when openIndex changes
  }, [openIndex]);
  

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen flex mb-[60px] flex-col items-center py-10 px-4 sm:px-6 lg:px-20 xl:px-32 bg-gradient-to-b from-white via-teal-50 to-white">

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-teal-800 mb-10"
      >
        🙋 Frequently Asked Questions
      </motion.h1>

      {/* FAQ Card Container */}
      <section className="w-full max-w-5xl space-y-5">
        {faqData.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white shadow-md rounded-2xl overflow-hidden border border-teal-100 hover:shadow-xl transition-all"
          >
            {/* Question */}
            <button
              className="flex items-center justify-between w-full px-5 py-4 sm:py-5 text-left hover:bg-teal-50 transition duration-200"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex items-center gap-3 text-gray-700 text-sm sm:text-base md:text-lg font-medium">
                <HelpCircle className="text-teal-600 w-5 h-5 sm:w-6 sm:h-6" />
                <span className="tracking-wide">{faq.question}</span>
              </div>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {openIndex === index ? (
                  <ChevronUp className="text-teal-700 w-5 sm:w-6 h-5 sm:h-6" />
                ) : (
                  <ChevronDown className="text-teal-700 w-5 sm:w-6 h-5 sm:h-6" />
                )}
              </motion.div>
            </button>

            {/* Answer */}
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="px-6 pb-4 text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed tracking-wide"
                >
                  <span className="block border-l-4 border-teal-400 pl-4 mt-2">
                    {typedText}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </section>
    </main>
  );
}

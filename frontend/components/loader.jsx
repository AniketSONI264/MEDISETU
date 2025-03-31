// "use client";
// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";

// export default function Loader() {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 2500); // Simulate loading time
//     return () => clearTimeout(timer);
//   }, []);

//   if (!isLoading) return null; // Hide loader after loading

//   return (
//     <motion.div
//       initial={{ opacity: 1 }}
//       animate={{ opacity: 0 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.5 }}
//       className="fixed inset-0 bg-white flex justify-center items-center z-50"
//     >
//       <div className="flex flex-col items-center">
//         {/* Animated SVG Loader */}
//         <svg
//           className="w-24 h-24 animate-spin"
//           viewBox="0 0 50 50"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           stroke="teal"
//           strokeWidth="5"
//         >
//           <circle cx="25" cy="25" r="20" strokeDasharray="125.6" strokeDashoffset="0">
//             <animate
//               attributeName="stroke-dashoffset"
//               from="125.6"
//               to="0"
//               dur="1s"
//               repeatCount="indefinite"
//             />
//           </circle>
//         </svg>

//         <p className="text-teal-700 font-semibold mt-4 text-lg animate-pulse">
//           Loading MediSetu...
//         </p>
//       </div>
//     </motion.div>
//   );
// }




"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500); // Adjust loading time
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null; // Hide loader after loading

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-gray-100 flex justify-center items-center z-50"
    >
      <div className="flex flex-col items-center">
        {/* Beautiful SVG Wave Loader */}
        <svg
          className="w-24 h-24"
          viewBox="0 0 100 20"
          xmlns="http://www.w3.org/2000/svg"
          fill="teal"
        >
          <circle cx="10" cy="10" r="3">
            <animate
              attributeName="cy"
              values="10; 5; 10"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="30" cy="10" r="3">
            <animate
              attributeName="cy"
              values="10; 5; 10"
              dur="0.6s"
              begin="0.2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="50" cy="10" r="3">
            <animate
              attributeName="cy"
              values="10; 5; 10"
              dur="0.6s"
              begin="0.4s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        {/* Blinking Loading Text */}
        <motion.p
          className="text-teal-700 font-semibold mt-4 text-lg"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          Loading MediSetu...
        </motion.p>
      </div>
    </motion.div>
  );
}

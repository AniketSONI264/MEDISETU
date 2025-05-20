// // // app/(register)/doctor/components/StepThree.jsx
// // "use client";
// // import React from "react";
// // import { motion } from "framer-motion";

// // const StepThree = ({ formData, setFormData }) => {
// //   const handleTimingChange = (dayIndex, field, value) => {
// //     const updatedTimings = [...(formData.availableTimings || [])];
// //     updatedTimings[dayIndex] = {
// //       ...updatedTimings[dayIndex],
// //       day: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][dayIndex],
// //       [field]: value,
// //     };
// //     setFormData({ ...formData, availableTimings: updatedTimings });
// //   };

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, x: 30 }}
// //       animate={{ opacity: 1, x: 0 }}
// //       transition={{ duration: 0.5 }}
// //       className="space-y-4"
// //     >
// //       {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
// //         <div key={day} className="grid grid-cols-3 gap-4 items-center">
// //           <span className="font-medium text-gray-700">{day}</span>
// //           <input
// //             type="time"
// //             value={formData.availableTimings?.[index]?.start || ""}
// //             onChange={(e) => handleTimingChange(index, "start", e.target.value)}
// //             className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-teal-400"
// //           />
// //           <input
// //             type="time"
// //             value={formData.availableTimings?.[index]?.end || ""}
// //             onChange={(e) => handleTimingChange(index, "end", e.target.value)}
// //             className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-teal-400"
// //           />
// //         </div>
// //       ))}
// //     </motion.div>
// //   );
// // };

// // export default StepThree;




// "use client";

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import toast from "react-hot-toast";

// const daysOfWeek = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Sunday",
// ];

// const StepThree = ({ formData, setFormData, goToNext, goToPrevious }) => {
//   const [showErrors, setShowErrors] = useState(false);

//   const handleTimingChange = (dayIndex, field, value) => {
//     // Copy current timings or initialize array if undefined
//     const currentTimings = formData.availableTimings ? [...formData.availableTimings] : [];
    
//     // If there is no entry for this day yet, create one
//     if (!currentTimings[dayIndex]) {
//       currentTimings[dayIndex] = { day: daysOfWeek[dayIndex], start: "", end: "" };
//     }
    
//     // Update the relevant field (start/end) for the day
//     currentTimings[dayIndex] = {
//       ...currentTimings[dayIndex],
//       [field]: value,
//     };

//     // Update the form data state with new timings
//     setFormData({ ...formData, availableTimings: currentTimings });
//   };

//   // Validate that at least one day has complete availability (both start & end are filled)
//   const isStepThreeValid = () => {
//     const timings = formData.availableTimings || [];
//     // Check for at least one day where both start and end are provided
//     const hasAvailability = timings.some(
//       (day) => day && day.start.trim() !== "" && day.end.trim() !== ""
//     );
//     // Also, if a day is partially filled, that's an error
//     const hasPartial = timings.some(
//       (day) =>
//         day &&
//         ((day.start.trim() !== "" && day.end.trim() === "") ||
//           (day.start.trim() === "" && day.end.trim() !== ""))
//     );
//     if (hasPartial) return false;
//     return hasAvailability;
//   };

//   const handleNextClick = () => {
//     if (isStepThreeValid()) {
//       setShowErrors(false);
//       goToNext();
//     } else {
//       setShowErrors(true);
//       toast.error("Please provide complete availability for at least one day.");
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: 30 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.5 }}
//       className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 space-y-6"
//     >
//       <h2 className="text-xl font-semibold text-teal-600 mb-4">
//         Set Your Weekly Availability
//       </h2>
//       {daysOfWeek.map((day, index) => (
//         <div key={day} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center py-2 border-b last:border-0">
//           <span className="font-medium text-gray-700">{day}</span>
//           <div className="flex flex-col">
//             <label className="text-xs text-gray-500">Start Time</label>
//             <input
//               type="time"
//               value={formData.availableTimings?.[index]?.start || ""}
//               onChange={(e) => handleTimingChange(index, "start", e.target.value)}
//               className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-teal-400"
//             />
//           </div>
//           <div className="flex flex-col">
//             <label className="text-xs text-gray-500">End Time</label>
//             <input
//               type="time"
//               value={formData.availableTimings?.[index]?.end || ""}
//               onChange={(e) => handleTimingChange(index, "end", e.target.value)}
//               className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-teal-400"
//             />
//           </div>
//         </div>
//       ))}
//       {showErrors && (
//         <p className="text-red-500 text-sm italic">
//           Ensure at least one day has both start and end times filled. Partial entries are not allowed.
//         </p>
//       )}
//       <p className="text-xs text-gray-500 italic">
//         Note: Leave fields blank if you are not available on that day.
//       </p>
//       <div className="flex justify-between pt-6">
//         <button
//           onClick={goToPrevious}
//           className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-xl transition duration-300"
//         >
//           Previous
//         </button>
//         <button
//           onClick={handleNextClick}
//           className={`${
//             !isStepThreeValid() ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700 text-white"
//           } font-medium py-2 px-6 rounded-xl transition duration-300`}
//         >
//           Next
//         </button>
//       </div>
//     </motion.div>
//   );
// };

// export default StepThree;







"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const StepThree = ({ formData, setFormData, goToNext, goToPrevious }) => {
  const [showErrors, setShowErrors] = useState(false);

  const handleTimingChange = (dayIndex, field, value) => {
    const currentTimings = formData.availableTimings ? [...formData.availableTimings] : [];

    if (!currentTimings[dayIndex]) {
      currentTimings[dayIndex] = {
        day: daysOfWeek[dayIndex],
        start: "",
        end: "",
        unavailable: false,
      };
    }

    currentTimings[dayIndex] = {
      ...currentTimings[dayIndex],
      [field]: value,
    };

    setFormData({ ...formData, availableTimings: currentTimings });
  };

  const handleUnavailableToggle = (dayIndex) => {
    const currentTimings = formData.availableTimings ? [...formData.availableTimings] : [];

    if (!currentTimings[dayIndex]) {
      currentTimings[dayIndex] = {
        day: daysOfWeek[dayIndex],
        start: "",
        end: "",
        unavailable: false,
      };
    }

    const isNowUnavailable = !currentTimings[dayIndex].unavailable;

    currentTimings[dayIndex] = {
      ...currentTimings[dayIndex],
      start: "",
      end: "",
      unavailable: isNowUnavailable,
    };

    setFormData({ ...formData, availableTimings: currentTimings });
  };

  const isStepThreeValid = () => {
    const timings = formData.availableTimings || [];

    let hasAtLeastOneValidDay = false;

    for (let i = 0; i < 7; i++) {
      const day = timings[i];
      if (!day || day.unavailable) continue;

      const start = day.start?.trim();
      const end = day.end?.trim();

      if ((start && !end) || (!start && end)) return false;
      if (start && end) hasAtLeastOneValidDay = true;
    }

    return hasAtLeastOneValidDay;
  };

  const handleNextClick = () => {
    if (isStepThreeValid()) {
      setShowErrors(false);
      goToNext();
    } else {
      setShowErrors(true);
      toast.error("Please set full availability for at least one day. Partial entries not allowed.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 space-y-6"
    >
      <h2 className="text-xl font-semibold text-teal-600 mb-4">
        Set Your Weekly Availability
      </h2>

      {daysOfWeek.map((day, index) => {
        const isUnavailable = formData.availableTimings?.[index]?.unavailable || false;

        return (
          <div
            key={day}
            className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center py-2 border-b last:border-0"
          >
            <span className="font-medium text-gray-700">{day}</span>

            <div className="flex flex-col">
              <label className="text-xs text-gray-500">Start Time</label>
              <input
                type="time"
                value={formData.availableTimings?.[index]?.start || ""}
                onChange={(e) =>
                  handleTimingChange(index, "start", e.target.value)
                }
                disabled={isUnavailable}
                className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-teal-400 disabled:bg-gray-100"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs text-gray-500">End Time</label>
              <input
                type="time"
                value={formData.availableTimings?.[index]?.end || ""}
                onChange={(e) =>
                  handleTimingChange(index, "end", e.target.value)
                }
                disabled={isUnavailable}
                className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-teal-400 disabled:bg-gray-100"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isUnavailable}
                onChange={() => handleUnavailableToggle(index)}
              />
              <span className="text-sm text-gray-600">Unavailable</span>
            </div>
          </div>
        );
      })}

      {showErrors && (
        <p className="text-red-500 text-sm italic">
          At least one full day of availability is required. No partial timings allowed.
        </p>
      )}

      <p className="text-xs text-gray-500 italic">
        Tip: You can leave a day as unavailable or skip timings if you're not available on that day.
      </p>

      <div className="flex justify-between pt-6">
        <button
          onClick={goToPrevious}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-xl transition duration-300"
        >
          Previous
        </button>

        <button
          onClick={handleNextClick}
          className={`${
            !isStepThreeValid()
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-teal-600 hover:bg-teal-700 text-white"
          } font-medium py-2 px-6 rounded-xl transition duration-300`}
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};

export default StepThree;

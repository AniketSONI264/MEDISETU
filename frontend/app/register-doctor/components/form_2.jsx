// // "use client";

// // import React from "react";
// // import { motion } from "framer-motion";

// // const StepTwo = ({ formData, setFormData }) => {
// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.5 }}
// //       className="space-y-6 bg-white p-6 rounded-2xl shadow-md border border-gray-200"
// //     >
// //       <div>
// //         <label className="block font-semibold text-sm text-gray-700">Specialization</label>
// //         <select
// //           name="specialization"
// //           value={formData.specialization || ""}
// //           onChange={handleChange}
// //           className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
// //         >
// //           <option value="">Select Specialization</option>
// //           <option value="Cardiologist">Cardiologist</option>
// //           <option value="Dermatologist">Dermatologist</option>
// //           <option value="Neurologist">Neurologist</option>
// //           <option value="Orthopedic">Orthopedic</option>
// //           <option value="Pediatrician">Pediatrician</option>
// //           <option value="Psychiatrist">Psychiatrist</option>
// //         </select>
// //       </div>

// //       <div>
// //         <label className="block font-semibold text-sm text-gray-700">Qualification</label>
// //         <input
// //           type="text"
// //           name="qualification"
// //           placeholder="e.g. MBBS, MD, BAMS"
// //           value={formData.qualification || ""}
// //           onChange={handleChange}
// //           className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
// //         />
// //       </div>

// //       <div>
// //         <label className="block font-semibold text-sm text-gray-700">Years of Experience</label>
// //         <input
// //           type="number"
// //           name="experience"
// //           placeholder="e.g. 5"
// //           value={formData.experience || ""}
// //           onChange={handleChange}
// //           className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
// //         />
// //       </div>

// //       <div>
// //         <label className="block font-semibold text-sm text-gray-700">Registration Number</label>
// //         <input
// //           type="text"
// //           name="registrationNumber"
// //           placeholder="Medical council registration"
// //           value={formData.registrationNumber || ""}
// //           onChange={handleChange}
// //           className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
// //         />
// //       </div>

// //       <div>
// //         <label className="block font-semibold text-sm text-gray-700">Consultation Fees (₹)</label>
// //         <input
// //           type="number"
// //           name="consultationFees"
// //           placeholder="e.g. 500"
// //           value={formData.consultationFees || ""}
// //           onChange={handleChange}
// //           className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
// //         />
// //       </div>

// //       <div>
// //         <label className="block font-semibold text-sm text-gray-700">Languages Spoken</label>
// //         <input
// //           type="text"
// //           name="languagesSpoken"
// //           placeholder="e.g. English, Hindi"
// //           value={formData.languagesSpoken || ""}
// //           onChange={handleChange}
// //           className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
// //         />
// //       </div>

// //       <div>
// //         <label className="block font-semibold text-sm text-gray-700">Short Bio</label>
// //         <textarea
// //           name="bio"
// //           placeholder="A short description about yourself"
// //           value={formData.bio || ""}
// //           onChange={handleChange}
// //           rows="4"
// //           className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
// //         ></textarea>
// //       </div>
// //     </motion.div>
// //   );
// // };

// // export default StepTwo;



// // "use client";

// // import React, { useState } from "react";
// // import { motion } from "framer-motion";

// // const StepTwo = ({ formData, setFormData }) => {
// //   const [customSpecialization, setCustomSpecialization] = useState("");
// //   const [showCustomInput, setShowCustomInput] = useState(false);

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSpecializationChange = (e) => {
// //     const value = e.target.value;
// //     if (value === "other") {
// //       setShowCustomInput(true);
// //       setFormData({ ...formData, specialization: customSpecialization });
// //     } else {
// //       setShowCustomInput(false);
// //       setFormData({ ...formData, specialization: value });
// //     }
// //   };

// //   const handleCustomSpecializationChange = (e) => {
// //     const value = e.target.value;
// //     setCustomSpecialization(value);
// //     setFormData({ ...formData, specialization: value });
// //   };

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.5 }}
// //       className="space-y-4"
// //     >
// //       <div>
// //         <label className="block font-semibold text-sm text-gray-700">Specialization</label>
// //         <select
// //           name="specialization"
// //           value={showCustomInput ? "other" : formData.specialization || ""}
// //           onChange={handleSpecializationChange}
// //           className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
// //         >
// //           <option value="">Select specialization</option>
// //           <option value="Cardiologist">Cardiologist</option>
// //           <option value="Dermatologist">Dermatologist</option>
// //           <option value="Gynecologist">Gynecologist</option>
// //           <option value="Neurologist">Neurologist</option>
// //           <option value="other">Other</option>
// //         </select>
// //         {showCustomInput && (
// //           <input
// //             type="text"
// //             placeholder="Enter your specialization"
// //             value={customSpecialization}
// //             onChange={handleCustomSpecializationChange}
// //             className="mt-2 w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
// //           />
// //         )}
// //       </div>

// //       <div>
// //         <label className="block font-semibold text-sm text-gray-700">Qualification</label>
// //         <input
// //           type="text"
// //           name="qualification"
// //           placeholder="Your medical qualification"
// //           value={formData.qualification || ""}
// //           onChange={handleChange}
// //           className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
// //         />
// //       </div>

// //       <div>
// //         <label className="block font-semibold text-sm text-gray-700">Years of Experience</label>
// //         <input
// //           type="number"
// //           name="experience"
// //           placeholder="e.g. 5"
// //           value={formData.experience || ""}
// //           onChange={handleChange}
// //           className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
// //         />
// //       </div>

// //       <div>
// //         <label className="block font-semibold text-sm text-gray-700">Registration Number</label>
// //         <input
// //           type="text"
// //           name="registrationNumber"
// //           placeholder="Enter your medical registration number"
// //           value={formData.registrationNumber || ""}
// //           onChange={handleChange}
// //           className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
// //         />
// //       </div>

// //       <div>
// //         <label className="block font-semibold text-sm text-gray-700">Consultation Fees (₹)</label>
// //         <input
// //           type="number"
// //           name="consultationFees"
// //           placeholder="e.g. 500"
// //           value={formData.consultationFees || ""}
// //           onChange={handleChange}
// //           className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
// //         />
// //       </div>

// //       <div>
// //         <label className="block font-semibold text-sm text-gray-700">Languages Spoken</label>
// //         <input
// //           type="text"
// //           name="languagesSpoken"
// //           placeholder="e.g. English, Hindi"
// //           value={formData.languagesSpoken || ""}
// //           onChange={handleChange}
// //           className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
// //         />
// //       </div>

// //       <div>
// //         <label className="block font-semibold text-sm text-gray-700">Short Bio</label>
// //         <textarea
// //           name="bio"
// //           placeholder="Tell us something about yourself"
// //           value={formData.bio || ""}
// //           onChange={handleChange}
// //           className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
// //         ></textarea>
// //       </div>
// //     </motion.div>
// //   );
// // };

// // export default StepTwo;


// "use client";

// import React, { useState } from "react";
// import { motion } from "framer-motion";

// const StepTwo = ({ formData, setFormData }) => {
//   const [customSpecialization, setCustomSpecialization] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSpecializationChange = (e) => {
//     const value = e.target.value;
//     if (value === "other") {
//       setFormData({ ...formData, specialization: customSpecialization });
//     } else {
//       setFormData({ ...formData, specialization: value });
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 space-y-4"
//     >
//       <div>
//         <label className="block font-semibold text-sm text-gray-700">Specialization</label>
//         <select
//           name="specialization"
//           value={formData.specialization || ""}
//           onChange={handleSpecializationChange}
//           className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
//         >
//           <option value="">Select specialization</option>
//           <option value="Cardiologist">Cardiologist</option>
//           <option value="Dermatologist">Dermatologist</option>
//           <option value="Gynecologist">Gynecologist</option>
//           <option value="Neurologist">Neurologist</option>
//           <option value="other">Other</option>
//         </select>
//         {formData.specialization === customSpecialization && (
//           <input
//             type="text"
//             placeholder="Enter your specialization"
//             value={customSpecialization}
//             onChange={(e) => {
//               setCustomSpecialization(e.target.value);
//               setFormData({ ...formData, specialization: e.target.value });
//             }}
//             className="mt-2 w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
//           />
//         )}
//       </div>

//       <div>
//         <label className="block font-semibold text-sm text-gray-700">Qualification</label>
//         <input
//           type="text"
//           name="qualification"
//           placeholder="Your medical qualification"
//           value={formData.qualification || ""}
//           onChange={handleChange}
//           className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
//         />
//       </div>

//       <div>
//         <label className="block font-semibold text-sm text-gray-700">Years of Experience</label>
//         <input
//           type="number"
//           name="experience"
//           placeholder="e.g. 5"
//           value={formData.experience || ""}
//           onChange={handleChange}
//           className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
//         />
//       </div>

//       <div>
//         <label className="block font-semibold text-sm text-gray-700">Registration Number</label>
//         <input
//           type="text"
//           name="registrationNumber"
//           placeholder="Enter your medical registration number"
//           value={formData.registrationNumber || ""}
//           onChange={handleChange}
//           className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
//         />
//       </div>

//       <div>
//         <label className="block font-semibold text-sm text-gray-700">Consultation Fees (₹)</label>
//         <input
//           type="number"
//           name="consultationFees"
//           placeholder="e.g. 500"
//           value={formData.consultationFees || ""}
//           onChange={handleChange}
//           className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
//         />
//       </div>

//       <div>
//         <label className="block font-semibold text-sm text-gray-700">Languages Spoken</label>
//         <input
//           type="text"
//           name="languagesSpoken"
//           placeholder="e.g. English, Hindi"
//           value={formData.languagesSpoken || ""}
//           onChange={handleChange}
//           className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
//         />
//       </div>

//       <div>
//         <label className="block font-semibold text-sm text-gray-700">Short Bio</label>
//         <textarea
//           name="bio"
//           placeholder="Tell us something about yourself"
//           value={formData.bio || ""}
//           onChange={handleChange}
//           className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
//         ></textarea>
//       </div>
//     </motion.div>
//   );
// };

// export default StepTwo;



// "use client";

// import React, { useState } from "react";
// import { motion } from "framer-motion";

// const StepTwo = ({ formData, setFormData }) => {
//   const [customSpecialization, setCustomSpecialization] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSpecializationChange = (e) => {
//     const value = e.target.value;
//     if (value === "other") {
//       setFormData({ ...formData, specialization: "" }); // Clear specialization to allow custom entry
//     } else {
//       setCustomSpecialization("");
//       setFormData({ ...formData, specialization: value });
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 space-y-4"
//     >
//       {/* Specialization */}
//       <div>
//         <label className="block font-semibold text-sm text-gray-700">Specialization</label>
//         <select
//           name="specialization"
//           value={
//             ["Cardiologist", "Dermatologist", "Gynecologist", "Neurologist"].includes(
//               formData.specialization
//             )
//               ? formData.specialization
//               : "other"
//           }
//           onChange={handleSpecializationChange}
//           className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
//         >
//           <option value="">Select specialization</option>
//           <option value="Cardiologist">Cardiologist</option>
//           <option value="Dermatologist">Dermatologist</option>
//           <option value="Gynecologist">Gynecologist</option>
//           <option value="Neurologist">Neurologist</option>
//           <option value="other">Other</option>
//         </select>

//         {(!["Cardiologist", "Dermatologist", "Gynecologist", "Neurologist"].includes(
//           formData.specialization
//         ) || formData.specialization === "") && (
//           <input
//             type="text"
//             placeholder="Enter your specialization"
//             value={formData.specialization || ""}
//             onChange={(e) =>
//               setFormData({ ...formData, specialization: e.target.value })
//             }
//             className="mt-2 w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
//           />
//         )}
//       </div>

//       {/* Qualification */}
//       <div>
//         <label className="block font-semibold text-sm text-gray-700">Qualification</label>
//         <input
//           type="text"
//           name="qualification"
//           placeholder="Your medical qualification"
//           value={formData.qualification || ""}
//           onChange={handleChange}
//           className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
//         />
//       </div>

//       {/* Experience */}
//       <div>
//         <label className="block font-semibold text-sm text-gray-700">Years of Experience</label>
//         <input
//           type="number"
//           name="experience"
//           min="0"
//           placeholder="e.g. 5"
//           value={formData.experience || ""}
//           onChange={handleChange}
//           className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
//         />
//       </div>

//       {/* Registration Number */}
//       <div>
//         <label className="block font-semibold text-sm text-gray-700">Registration Number</label>
//         <input
//           type="text"
//           name="registrationNumber"
//           placeholder="Enter your medical registration number"
//           value={formData.registrationNumber || ""}
//           onChange={handleChange}
//           className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
//         />
//       </div>

//       {/* Consultation Fees */}
//       <div>
//         <label className="block font-semibold text-sm text-gray-700">Consultation Fees (₹)</label>
//         <input
//           type="number"
//           name="consultationFees"
//           min="0"
//           placeholder="e.g. 500"
//           value={formData.consultationFees || ""}
//           onChange={handleChange}
//           className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
//         />
//       </div>

//       {/* Languages Spoken */}
//       <div>
//         <label className="block font-semibold text-sm text-gray-700">Languages Spoken</label>
//         <input
//           type="text"
//           name="languagesSpoken"
//           placeholder="e.g. English, Hindi"
//           value={formData.languagesSpoken || ""}
//           onChange={handleChange}
//           className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
//         />
//       </div>

//       {/* Short Bio */}
//       <div>
//         <label className="block font-semibold text-sm text-gray-700">Short Bio</label>
//         <textarea
//           name="bio"
//           rows={3}
//           placeholder="Tell us something about yourself"
//           value={formData.bio || ""}
//           onChange={handleChange}
//           className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
//         ></textarea>
//       </div>
//     </motion.div>
//   );
// };

// export default StepTwo;









"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const StepTwo = ({ formData, setFormData, goToNext, goToPrevious }) => {
  const [showErrors, setShowErrors] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSpecializationChange = (e) => {
    const value = e.target.value;
    if (value === "other") {
      setFormData({ ...formData, specialization: "" });
    } else {
      setFormData({ ...formData, specialization: value });
    }
  };

  const isValid = () => {
    const {
      specialization,
      qualification,
      experience,
      registrationNumber,
      consultationFees,
      languagesSpoken,
    } = formData;

    return (
      specialization?.trim() &&
      qualification?.trim() &&
      registrationNumber?.trim() &&
      languagesSpoken?.trim() &&
      !isNaN(experience) &&
      experience >= 0 &&
      !isNaN(consultationFees) &&
      consultationFees >= 0
    );
  };

  const handleNext = () => {
    if (isValid()) {
      goToNext?.(); // optional chaining to avoid "not a function" error
    } else {
      setShowErrors(true);
      toast.error("Please fill in all required fields correctly.");
    }
  };

  const handleBack = () => {
    goToPrevious?.();
  };

  const showError = (field) => showErrors && !formData[field]?.trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 space-y-4"
    >
      {/* Specialization */}
      <div>
        <label className="block font-semibold text-sm text-gray-700">Specialization<span className="text-red-400">*</span></label>
          <select
  name="specialization"
  value={
    formData.specialization === ""
      ? ""
      : ["Cardiologist", "Dermatologist", "Gynecologist", "Neurologist"].includes(
          formData.specialization
        )
      ? formData.specialization
      : "other"
  }
  onChange={handleSpecializationChange}
  className={`w-full p-2 rounded border ${
    showError("specialization") ? "border-red-500" : "border-gray-300"
  } focus:outline-none focus:ring-2 focus:ring-teal-400`}
>
  <option value="">Select specialization</option>
  <option value="Cardiologist">Cardiologist</option>
  <option value="Dermatologist">Dermatologist</option>
  <option value="Gynecologist">Gynecologist</option>
  <option value="Neurologist">Neurologist</option>
  <option value="other">Other</option>
</select>


        {(!["Cardiologist", "Dermatologist", "Gynecologist", "Neurologist"].includes(
          formData.specialization
        ) ||
          formData.specialization === "") && (
          <input
            type="text"
            placeholder="Enter your specialization"
            value={formData.specialization || ""}
            onChange={(e) =>
              setFormData({ ...formData, specialization: e.target.value })
            }
            className={`mt-2 w-full p-2 rounded border ${
              showError("specialization") ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-teal-400`}
          />
        )}
      </div>

      {/* Qualification */}
      <div>
        <label className="block font-semibold text-sm text-gray-700">Qualification<span className="text-red-400">*</span> </label>
        <input
          type="text"
          name="qualification"
          placeholder="Your medical qualification"
          value={formData.qualification || ""}
          onChange={handleChange}
          className={`w-full p-2 rounded border ${
            showError("qualification") ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-teal-400`}
        />
      </div>

      {/* Experience */}
      <div>
        <label className="block font-semibold text-sm text-gray-700">Years of Experience</label>
        <input
          type="number"
          name="experience"
          min="0"
          placeholder="e.g. 5"
          value={formData.experience || ""}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
      </div>

      {/* Registration Number */}
      <div>
        <label className="block font-semibold text-sm text-gray-700">Registration Number<span className="text-red-400">*</span> </label>
        <input
          type="text"
          name="registrationNumber"
          placeholder="Enter your medical registration number"
          value={formData.registrationNumber || ""}
          onChange={handleChange}
          className={`w-full p-2 rounded border ${
            showError("registrationNumber") ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-teal-400`}
        />
      </div>

      {/* Consultation Fees */}
      <div>
        <label className="block font-semibold text-sm text-gray-700">Consultation Fees (₹)</label>
        <input
          type="number"
          name="consultationFees"
          min="0"
          placeholder="e.g. 500"
          value={formData.consultationFees || ""}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
      </div>

      {/* Languages Spoken */}
      <div>
        <label className="block font-semibold text-sm text-gray-700">Languages Spoken<span className="text-red-400">*</span></label>
        <input
    type="text"
    name="languagesSpoken"
    placeholder="e.g. English, Hindi"
    value={formData.languagesSpoken || ""}
     onChange={handleChange}
    className={`w-full p-2 rounded border ${
    showError("languagesSpoken") ? "border-red-500" : "border-gray-300"
      } focus:outline-none focus:ring-2 focus:ring-teal-400`}
    />

      </div>

      {/* Short Bio */}
      <div>
        <label className="block font-semibold text-sm text-gray-700">Short Bio</label>
        <textarea
          name="bio"
          rows={3}
          placeholder="Tell us something about yourself"
          value={formData.bio || ""}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
        ></textarea>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={handleBack}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};

export default StepTwo;

// "use client";

// import React, { useEffect } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { motion, AnimatePresence } from "framer-motion";
// import { BookOpen, Info, Clock3, ClipboardList , ShieldCheck, HeartHandshake, Sparkles} from "lucide-react";
// import StepOne from "./components/form_1";
// import StepTwo from "./components/form_2";
// import StepThree from "./components/form_3";
// import StepFour from "./components/form_4";
// import { useDoctorForm } from "../../hooks/useDoctorForm";
// import { prepareDoctorPayload } from "../../utils/docFormHelper";
// import { registerDoctor } from "../../utils/api";
// import DocIntro from "../../components/docIntro.jsx"
// import DocOutro from "../../components/docOutro.jsx"

// const DoctorRegisterPage = () => {
//   const {
//     step,
//     formData,
//     setFormData,
//     handleChange,
//     goToNext,
//     goToPrevious,
//     resetForm,
//   } = useDoctorForm();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [step]);

//   const handleSubmit = async () => {
//     try {
//       const payload = prepareDoctorPayload(formData);
//       await registerDoctor(payload);
//       toast.success("Doctor registered successfully!");
//       resetForm();
//     } catch (err) {
//       console.error("Doctor registration failed:", err?.response?.data || err);
//       toast.error("Registration failed! Please check your input.");
//     }
//   };

//   const handleCancel = () => {
//     if (window.confirm("Are you sure you want to cancel registration?")) {
//       resetForm();
//       toast("Registration cancelled.");
//     }
//   };

//   const renderStep = () => {
//     const commonProps = { formData, setFormData, handleChange, goToNext, goToPrevious };

//     switch (step) {
//       case 1:
//         return <StepOne {...commonProps} />;
//       case 2:
//         return <StepTwo {...commonProps} />;
//       case 3:
//         return <StepThree {...commonProps} />;
//       case 4:
//         return <StepFour {...commonProps} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="mt-10 mb-32">
//         {/* <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-12 mb-32"> */}
   
//    <DocIntro />
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-12 mb-2">
//       <Toaster />
//       <motion.h2
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="text-3xl font-bold text-teal-600 text-center"
//       >
//         Become a Verified Doctor
//       </motion.h2>

//       <div className="mt-6 mb-4 text-center text-sm text-gray-500">
//         Step {step} of 4
//         <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
//           <div
//             className="bg-teal-500 h-2 rounded-full transition-all duration-300"
//             style={{ width: `${(step / 4) * 100}%` }}
//           />
//         </div>
//       </div>

//       <AnimatePresence mode="wait">
//         <motion.div
//           key={step}
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: -50 }}
//           transition={{ duration: 0.3 }}
//         >
//           {renderStep()}
//         </motion.div>
//       </AnimatePresence>

//       <div className="flex justify-between pt-4">
//         <button
//           onClick={handleCancel}
//           className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 font-medium rounded-xl"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={handleSubmit}
//           className="px-4 py-2 bg-teal-600 text-white hover:bg-teal-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
//           disabled={step !== 4}
//         >
//           Submit
//         </button>
//       </div>
//     </div>
   
//    <DocOutro />
//     </div>
//   );
// };

// export default DoctorRegisterPage;

"use client";

import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Info,
  Clock3,
  ClipboardList,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  PartyPopper,
  MailCheck,
} from "lucide-react";
import StepOne from "./components/form_1";
import StepTwo from "./components/form_2";
import StepThree from "./components/form_3";
import StepFour from "./components/form_4";
import { useDoctorForm } from "../../hooks/useDoctorForm";
import { prepareDoctorPayload } from "../../utils/docFormHelper";
import { registerDoctor } from "../../utils/api";
import DocIntro from "../../components/docIntro.jsx";
import DocOutro from "../../components/docOutro.jsx";

const DoctorRegisterPage = () => {
  const {
    step,
    formData,
    setFormData,
    handleChange,
    goToNext,
    goToPrevious,
    resetForm,
  } = useDoctorForm();

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleSubmit = async () => {
    try {
      const payload = prepareDoctorPayload(formData);
      await registerDoctor(payload);
      toast.success("Doctor registered successfully!");
      setIsSubmitted(true);
    } catch (err) {
      console.error("Doctor registration failed:", err?.response?.data || err);
      toast.error("Registration failed! Please check your input.");
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel registration?")) {
      resetForm();
      toast("Registration cancelled.");
    }
  };

  const renderStep = () => {
    const commonProps = {
      formData,
      setFormData,
      handleChange,
      goToNext,
      goToPrevious,
    };

    switch (step) {
      case 1:
        return <StepOne {...commonProps} />;
      case 2:
        return <StepTwo {...commonProps} />;
      case 3:
        return <StepThree {...commonProps} />;
      case 4:
        return <StepFour {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-10 mb-32">
      <DocIntro />

      <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-2 mb-2">
        <Toaster />

        {!isSubmitted ? (
          <>
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-teal-600 text-center"
            >
              Become a Verified Doctor
            </motion.h2>

            <div className="mt-6 mb-4 text-center text-sm text-gray-500">
              Step {step} of 4
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between pt-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 font-medium rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-teal-600 text-white hover:bg-teal-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={step !== 4}
              >
                Submit
              </button>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-6xl mb-4"
            >
              🎉
            </motion.div>
            <h2 className="text-2xl font-bold text-teal-700 mb-2">
              Thank You for Applying!
            </h2>
            <p className="text-gray-600 mb-6">
              Your application has been received. Our team will review your
              details and notify you shortly once your verification is complete.
            </p>
            <div className="flex justify-center gap-4 text-teal-600">
              <ShieldCheck size={32} className="animate-bounce" />
              <MailCheck size={32} className="animate-pulse" />
              <HeartHandshake size={32} className="animate-bounce" />
            </div>
          </motion.div>
        )}
      </div>

      <DocOutro />
    </div>
  );
};

export default DoctorRegisterPage;

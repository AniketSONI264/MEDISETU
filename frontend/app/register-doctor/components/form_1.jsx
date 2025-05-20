// "use client";

// import { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// // Make sure this import is valid or you can delete this if not required
// // import { getCityStateByPincode } from "../../../hooks/pincodeLookup.js";

// // Assuming you're missing this function:
// const fetchPincodeData = async (pincode) => {
//   try {
//     const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
//     const data = await res.json();
//     return data[0]; // response is an array
//   } catch (err) {
//     console.error("Failed to fetch pincode:", err);
//     return null;
//   }
// };

// export default function StepOne({ formData, handleChange, goToNext }) {
//   const [showErrors, setShowErrors] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);


//   // ✨ Validation function
//   const isStepOneValid = () => {
//     return (
//       (formData.firstName || "").trim() !== "" &&
//       (formData.lastName || "").trim() !== "" &&
//       (formData.email || "").trim() !== "" &&
//       (formData.phone || "").trim().length >= 10 &&
//       (formData.pincode || "").trim().length === 6 &&
//       (formData.city || "").trim() !== "" &&
//       (formData.state || "").trim() !== ""
//     );
//   };

//   // 🧠 Auto-fill city and state when pincode is valid
//   useEffect(() => {
//     const fetchData = async () => {
//       if ((formData.pincode || "").trim().length === 6) {
//         const result = await fetchPincodeData(formData.pincode);
//         console.log("Pincode API Response:", result); // Debug

//         if (
//           result?.Status === "Success" &&
//           Array.isArray(result?.PostOffice) &&
//           result.PostOffice.length > 0
//         ) {
//           const { District, State } = result.PostOffice[0];
//           handleChange("city", District || "");
//           handleChange("state", State || "");
//         } else {
//           toast.error("Invalid Pincode");
//           handleChange("city", "");
//           handleChange("state", "");
//         }
//       }
//     };

//     fetchData();
//   }, [formData.pincode]);

//   const handleNext = () => {
//     if (isStepOneValid()) {
//       goToNext();
//     } else {
//       setShowErrors(true);
//       toast.error("Please fill all required fields correctly.");
//     }
//   };

//   return (
//     <div className="space-y-6 bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//         {/* First Name */}
//         <InputField
//           label="First Name"
//           required
//           value={formData.firstName || ""}
//           onChange={(val) => handleChange("firstName", val)}
//           showError={showErrors && !formData.firstName}
//           errorMessage="First name is required"
//         />

//         {/* Last Name */}
//         <InputField
//           label="Last Name"
//           required
//           value={formData.lastName || ""}
//           onChange={(val) => handleChange("lastName", val)}
//           showError={showErrors && !formData.lastName}
//           errorMessage="Last name is required"
//         />

//         {/* Email */}
//         <InputField
//           label="Email"
//           type="email"
//           required
//           value={formData.email || ""}
//           onChange={(val) => handleChange("email", val)}
//           showError={showErrors && !formData.email}
//           errorMessage="Email is required"
//         />

//         {/* Phone */}
//         <InputField
//           label="Phone"
//           type="text"
//           required
//           value={formData.phone || ""}
//           onChange={(val) => handleChange("phone", val)}
//           showError={showErrors && (formData.phone || "").trim().length < 10}
//           errorMessage="Phone number must be at least 10 digits"
//         />

//         {/* Pincode */}
//         <InputField
//           label="Pincode"
//           type="text"
//           required
//           value={formData.pincode || ""}
//           onChange={(val) => handleChange("pincode", val)}
//           showError={showErrors && (formData.pincode || "").trim().length !== 6}
//           errorMessage="Pincode must be 6 digits"
//         />

//         {/* City */}
//         <InputField
//           label="City"
//           type="text"
//           required
//           value={formData.city || ""}
//           onChange={(val) => handleChange("city", val)}
//           showError={showErrors && !formData.city}
//           errorMessage="City is required"
//         />

//         {/* State */}
//         <InputField
//           label="State"
//           type="text"
//           required
//           value={formData.state || ""}
//           onChange={(val) => handleChange("state", val)}
//           showError={showErrors && !formData.state}
//           errorMessage="State is required"
//         />
//       </div>

//       <div className="flex justify-end pt-6">
//         <button
//           onClick={handleNext}
//           className={`${
//             isStepOneValid()
//               ? "bg-teal-600 hover:bg-teal-700 text-white"
//               : "bg-red-500 text-white"
//           } font-semibold py-2 px-6 rounded-xl transition duration-300`}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// // ✅ Reusable InputField Component
// function InputField({
//   label,
//   value,
//   onChange,
//   type = "text",
//   required = false,
//   showError = false,
//   errorMessage = "",
// }) {
//   return (
//     <div>
//       <label className="block text-sm font-medium text-gray-700">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       <input
//         type={type}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className={`mt-1 block w-full px-4 py-2 border ${
//           showError ? "border-red-500" : "border-gray-300"
//         } rounded-xl shadow-sm focus:ring-teal-500 focus:border-teal-500 transition-all duration-300`}
//       />
//       {showError && (
//         <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
//       )}
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Eye,EyeOff } from "lucide-react";

// Assuming you're missing this function:
const fetchPincodeData = async (pincode) => {
  try {
    const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    const data = await res.json();
    return data[0]; // response is an array
  } catch (err) {
    console.error("Failed to fetch pincode:", err);
    return null;
  }
};

export default function StepOne({ formData, handleChange, goToNext }) {
  const [showErrors, setShowErrors] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isStepOneValid = () => {
    return (
      (formData.firstName || "").trim() !== "" &&
      (formData.lastName || "").trim() !== "" &&
      (formData.email || "").trim() !== "" &&
      (formData.phone || "").trim().length >= 10 &&
      (formData.pincode || "").trim().length === 6 &&
      (formData.city || "").trim() !== "" &&
      (formData.state || "").trim() !== "" &&
      (formData.password || "").trim().length >= 6
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      if ((formData.pincode || "").trim().length === 6) {
        const result = await fetchPincodeData(formData.pincode);
        console.log("Pincode API Response:", result);

        if (
          result?.Status === "Success" &&
          Array.isArray(result?.PostOffice) &&
          result.PostOffice.length > 0
        ) {
          const { District, State } = result.PostOffice[0];
          handleChange("city", District || "");
          handleChange("state", State || "");
        } else {
          toast.error("Invalid Pincode");
          handleChange("city", "");
          handleChange("state", "");
        }
      }
    };

    fetchData();
  }, [formData.pincode]);

  const handleNext = () => {
    if (isStepOneValid()) {
      goToNext();
    } else {
      setShowErrors(true);
      toast.error("Please fill all required fields correctly.");
    }
  };

  return (
    <div className="space-y-6 bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* First Name */}
        <InputField
          label="First Name"
          required
          value={formData.firstName || ""}
          onChange={(val) => handleChange("firstName", val)}
          showError={showErrors && !formData.firstName}
          errorMessage="First name is required"
        />

        {/* Last Name */}
        <InputField
          label="Last Name"
          required
          value={formData.lastName || ""}
          onChange={(val) => handleChange("lastName", val)}
          showError={showErrors && !formData.lastName}
          errorMessage="Last name is required"
        />

        {/* Email */}
        <InputField
          label="Email"
          type="email"
          required
          value={formData.email || ""}
          onChange={(val) => handleChange("email", val)}
          showError={showErrors && !formData.email}
          errorMessage="Email is required"
        />

        {/* Phone */}
        <InputField
          label="Phone"
          type="text"
          required
          value={formData.phone || ""}
          onChange={(val) => handleChange("phone", val)}
          showError={showErrors && (formData.phone || "").trim().length < 10}
          errorMessage="Phone number must be at least 10 digits"
        />

        {/* Password */}
        {/* <InputField
          label="Password"
          type={showPassword ? "text" : "password"}
          required
          value={formData.password || ""}
          onChange={(val) => handleChange("password", val)}
          showError={showErrors && (formData.password || "").trim().length < 6}
          errorMessage="Password must be at least 6 characters"
          extra={
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-9 right-3 text-sm text-gray-500 hover:text-teal-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          }
        /> */}
        <div className="relative">
  <label className="block text-sm font-medium text-gray-700">
    Password <span className="text-red-500">*</span>
  </label>
  <input
    type={showPassword ? "text" : "password"}
    value={formData.password || ""}
    onChange={(e) => handleChange("password", e.target.value)}
    className={`mt-1 block w-full px-4 py-2 pr-12 border ${
      showErrors && (formData.password || "").length < 6
        ? "border-red-500"
        : "border-gray-300"
    } rounded-xl shadow-sm focus:ring-teal-500 focus:border-teal-500 transition-all duration-300`}
    placeholder="Enter password"
  />
  {/* Eye icon toggle */}
  <button
    type="button"
    onClick={() => setShowPassword((prev) => !prev)}
    className="absolute top-[38px] right-4 text-gray-600 hover:text-teal-600"
  >
    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
  </button>

  {showErrors && (formData.password || "").length < 6 && (
    <p className="text-red-500 text-xs mt-1">Password must be at least 6 characters</p>
  )}
</div>


        {/* Pincode */}
        <InputField
          label="Pincode"
          type="text"
          required
          value={formData.pincode || ""}
          onChange={(val) => handleChange("pincode", val)}
          showError={showErrors && (formData.pincode || "").trim().length !== 6}
          errorMessage="Pincode must be 6 digits"
        />

        {/* City */}
        <InputField
          label="City"
          type="text"
          required
          value={formData.city || ""}
          onChange={(val) => handleChange("city", val)}
          showError={showErrors && !formData.city}
          errorMessage="City is required"
        />

        {/* State */}
        <InputField
          label="State"
          type="text"
          required
          value={formData.state || ""}
          onChange={(val) => handleChange("state", val)}
          showError={showErrors && !formData.state}
          errorMessage="State is required"
        />
      </div>

      <div className="flex justify-end pt-6">
        <button
          onClick={handleNext}
          className={`${
            isStepOneValid()
              ? "bg-teal-600 hover:bg-teal-700 text-white"
              : "bg-red-500 text-white"
          } font-semibold py-2 px-6 rounded-xl transition duration-300`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

// 🧠 Reusable Input Field
function InputField({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  showError = false,
  errorMessage = "",
  extra = null,
}) {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1 block w-full px-4 py-2 border ${
          showError ? "border-red-500" : "border-gray-300"
        } rounded-xl shadow-sm focus:ring-teal-500 focus:border-teal-500 transition-all duration-300`}
      />
      {extra}
      {showError && (
        <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
      )}
    </div>
  );
}

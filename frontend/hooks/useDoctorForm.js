import { useState } from "react";

export const useDoctorForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    pincode: "",
    city: "",
    state: "",
    qualification: "",
    specialization: "",
    experience: "",
    consultationFees: "",
    languagesSpoken: "",
    registrationNumber: "",
    availableTimings: [],
    bio: "",
    detailedBio: "",
    profilePic: "",
    designation: "",
    clinicName: "",
  });

  const goToNext = () => setStep((s) => Math.min(s + 1, 4));
  const goToPrevious = () => setStep((s) => Math.max(s - 1, 1));
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      firstName: "", lastName: "", email: "", phone: "", password: "",
      pincode: "", city: "", state: "", qualification: "", specialization: "",
      experience: "", consultationFees: "", languagesSpoken: "",
      registrationNumber: "", availableTimings: [], bio: "", detailedBio: "",
      profilePic: "", designation: "", clinicName: ""
    });
    setStep(1);
  };

  return { step, formData, setFormData, handleChange, goToNext, goToPrevious, resetForm };
};

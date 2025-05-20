export const prepareDoctorPayload = (formData) => {
    const cleanLanguagesArray = formData.languagesSpoken
      .split(",")
      .map((lang) => lang.trim())
      .filter((lang) => lang !== "");
  
    const cleanedTimings = formData.availableTimings.filter(
      (slot) => slot && typeof slot === "object" && !slot.unavailable
    );
  
    return {
      ...formData,
      experience: Number(formData.experience),
      consultationFees: Number(formData.consultationFees),
      pincode: Number(formData.pincode),
      phone: Number(formData.phone),
      languagesSpoken: cleanLanguagesArray,
      availableTimings: cleanedTimings,
      bio: formData.detailedBio,
      detailedBio: formData.bio,
    };
  };
  
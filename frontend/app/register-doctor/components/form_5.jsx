"use client";

import React from "react";

const StepFive = ({ formData, setFormData }) => {
  const handleCheckbox = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleNotes = (e) => {
    setFormData((prev) => ({
      ...prev,
      agreementNotes: e.target.value,
    }));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-700">Agreements & Consent</h3>

      <div className="space-y-4">
        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={formData.agreedToTerms || false}
            onChange={() => handleCheckbox("agreedToTerms")}
            className="mt-1"
          />
          <span>
            I agree to the{" "}
            <a href="/terms" target="_blank" className="text-teal-600 underline">
              Terms & Conditions
            </a>
          </span>
        </label>

        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={formData.consentToPublicListing || false}
            onChange={() => handleCheckbox("consentToPublicListing")}
            className="mt-1"
          />
          <span>Consent to be listed publicly on MediSetu</span>
        </label>

        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={formData.consentToTelemedicine || false}
            onChange={() => handleCheckbox("consentToTelemedicine")}
            className="mt-1"
          />
          <span>I consent to provide telemedicine consultations</span>
        </label>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Additional Notes (Optional)
        </label>
        <textarea
          value={formData.agreementNotes || ""}
          onChange={handleNotes}
          rows="3"
          placeholder="Any notes or concerns you’d like to share..."
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        ></textarea>
      </div>
    </div>
  );
};

export default StepFive;

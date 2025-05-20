// components/ui/Input.jsx
import React from "react";

export const Input = ({ type = "text", placeholder, ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  );
};

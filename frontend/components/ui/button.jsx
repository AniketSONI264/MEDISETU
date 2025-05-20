// components/ui/Button.jsx
import React from "react";
import classNames from "classnames"; // optional, for dynamic styles

export const Button = ({ children, type = "button", variant = "primary", className = "", ...props }) => {
  const baseStyles = "px-4 py-2 rounded-md font-semibold transition-colors duration-200";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "bg-transparent text-blue-600 hover:underline",
  };

  return (
    <button
      type={type}
      className={classNames(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

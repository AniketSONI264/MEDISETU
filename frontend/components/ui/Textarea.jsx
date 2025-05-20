import React from "react";
import { cn } from "@/lib/utils"; // optional: for Tailwind class merging (if you use it)

const Textarea = ({
  label,
  value,
  onChange,
  name,
  placeholder = "Type here...",
  rows = 4,
  disabled = false,
  error = "",
  className = "",
  required = false,
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <textarea
        id={name}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          `w-full px-4 py-2 text-sm rounded-xl border focus:outline-none 
           focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white 
           dark:placeholder-gray-400 resize-none transition-all duration-200`,
          error ? "border-red-500" : "border-gray-300 dark:border-gray-600",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      />

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Textarea;

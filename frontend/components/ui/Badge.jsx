"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

const variantStyles = {
  primary: "bg-teal-100 text-teal-800 border border-teal-300",
  secondary: "bg-gray-100 text-gray-700 border border-gray-300",
  success: "bg-green-100 text-green-800 border border-green-300",
  danger: "bg-red-100 text-red-800 border border-red-300",
  warning: "bg-yellow-100 text-yellow-800 border border-yellow-300",
  info: "bg-blue-100 text-blue-800 border border-blue-300",
  purple: "bg-purple-100 text-purple-800 border border-purple-300",
  dark: "bg-zinc-800 text-white border border-zinc-700",
};

export const Badge = ({
  children,
  variant = "primary",
  className = "",
  animated = true,
}) => {
  const baseClass =
    "inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium shadow-sm transition-all duration-300";

  const badgeClasses = clsx(baseClass, variantStyles[variant], className);

  if (animated) {
    return (
      <motion.span
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={badgeClasses}
      >
        {children}
      </motion.span>
    );
  }

  return <span className={badgeClasses}>{children}</span>;
};


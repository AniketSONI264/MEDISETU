"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

export const CardHeader = ({ className = "", children }) => {
  return (
    <div className={clsx("flex flex-col space-y-1.5 p-6", className)}>
      {children}
    </div>
  );
};

export const CardTitle = ({ className = "", children }) => {
  return (
    <h3 className={clsx("text-2xl font-semibold leading-none tracking-tight", className)}>
      {children}
    </h3>
  );
};

export const CardContent = ({ className = "", children }) => {
  return (
    <div className={clsx("p-6 pt-0", className)}>
      {children}
    </div>
  );
};

export const Card = ({
  title,
  subtitle,
  description,
  image,
  actions,
  className = "",
  children,
  gradient = true,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={clsx(
        "group relative overflow-hidden rounded-2xl shadow-md border backdrop-blur-lg",
        "transition-all duration-300 ease-in-out",
        gradient
          ? "bg-gradient-to-br from-teal-50 via-white to-cyan-100 border-teal-200"
          : "bg-white border-gray-200",
        className
      )}
    >
      {image && (
        <div className="w-full h-48 overflow-hidden rounded-t-2xl">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-5">
        {title && (
          <h3 className="text-xl font-semibold text-teal-800 mb-1">{title}</h3>
        )}
        {subtitle && (
          <p className="text-sm text-gray-500 mb-2 font-medium">{subtitle}</p>
        )}
        {description && (
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            {description}
          </p>
        )}
        {children}
        {actions && <div className="mt-4">{actions}</div>}
      </div>
    </motion.div>
  );
}; 
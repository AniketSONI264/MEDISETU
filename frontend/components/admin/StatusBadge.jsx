'use client';

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const statusConfig = {
  pending: {
    variant: "warning",
    label: "Pending"
  },
  completed: {
    variant: "success",
    label: "Completed"
  },
  cancelled: {
    variant: "destructive",
    label: "Cancelled"
  },
  rescheduled: {
    variant: "info",
    label: "Rescheduled"
  },
  verified: {
    variant: "success",
    label: "Verified"
  },
  unverified: {
    variant: "warning",
    label: "Pending"
  }
};

export default function StatusBadge({ status, className = "" }) {
  const config = statusConfig[status.toLowerCase()] || {
    variant: "default",
    label: status
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Badge
        variant={config.variant}
        className={`capitalize ${className}`}
      >
        {config.label}
      </Badge>
    </motion.div>
  );
} 
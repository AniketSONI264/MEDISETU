'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { motion } from "framer-motion";

export default function FilterBar({
  filters,
  onFilterChange,
  title = "Filters",
  className = ""
}) {
  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={className}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filters.map((filter) => {
              if (filter.type === 'select') {
                return (
                  <div key={filter.key} className="space-y-2">
                    <label className="text-sm font-medium">{filter.label}</label>
                    <Select
                      value={filter.value}
                      onValueChange={(value) => handleChange(filter.key, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={filter.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {filter.options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </select>
                  </div>
                );
              }

              if (filter.type === 'date') {
                return (
                  <div key={filter.key} className="space-y-2">
                    <label className="text-sm font-medium">{filter.label}</label>
                    <Input
                      type="date"
                      value={filter.value}
                      onChange={(e) => handleChange(filter.key, e.target.value)}
                    />
                  </div>
                );
              }

              if (filter.type === 'text') {
                return (
                  <div key={filter.key} className="space-y-2">
                    <label className="text-sm font-medium">{filter.label}</label>
                    <Input
                      type="text"
                      placeholder={filter.placeholder}
                      value={filter.value}
                      onChange={(e) => handleChange(filter.key, e.target.value)}
                    />
                  </div>
                );
              }

              return null;
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { ChevronDown, X } from 'lucide-react';

export const Select = ({
  options=[],
  value,
  onChange,
  placeholder = 'Select an option',
  className,
  searchable = false,
  multiple = false,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const selectRef = useRef(null);

  const filteredOptions = searchable
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  const handleSelect = (option) => {
    if (multiple) {
      const newValue = value.includes(option.value)
        ? value.filter((v) => v !== option.value)
        : [...value, option.value];
      onChange(newValue);
    } else {
      onChange(option.value);
      setIsOpen(false);
    }
  };

  const handleRemove = (optionValue, e) => {
    e.stopPropagation();
    onChange(value.filter((v) => v !== optionValue));
  };

  const selectedLabels = multiple
    ? options
        .filter((option) => value.includes(option.value))
        .map((option) => option.label)
    : options.find((option) => option.value === value)?.label;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={selectRef}>
      <div
        className={cn(
          "flex min-h-[40px] w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm",
          disabled && "cursor-not-allowed bg-gray-100",
          !disabled && "cursor-pointer hover:border-gray-400",
          className
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1">
          {multiple ? (
            value.length > 0 ? (
              value.map((v) => {
                const option = options.find((opt) => opt.value === v);
                return (
                  <span
                    key={v}
                    className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700"
                  >
                    {option?.label}
                    <button
                      type="button"
                      onClick={(e) => handleRemove(v, e)}
                      className="hover:text-blue-900"
                    >
                      <X size={12} />
                    </button>
                  </span>
                );
              })
            ) : (
              <span className="text-gray-500">{placeholder}</span>
            )
          ) : (
            <span className={value ? "text-gray-900" : "text-gray-500"}>
              {selectedLabels || placeholder}
            </span>
          )}
        </div>
        <ChevronDown
          size={16}
          className={cn(
            "text-gray-500 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg"
          >
            {searchable && (
              <div className="sticky top-0 border-b border-gray-200 bg-white p-2">
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    "cursor-pointer px-3 py-2 text-sm hover:bg-gray-100",
                    (multiple
                      ? value.includes(option.value)
                      : value === option.value) && "bg-blue-50"
                  )}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500">
                No options found
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const SelectItem = ({ children, ...props }) => {
  return (
    <div
      {...props}
      className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100"
    >
      {children}
    </div>
  );
};

Select.Item = SelectItem;

// export default {Select , SelectItem}; 
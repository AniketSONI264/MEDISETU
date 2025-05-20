import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const Table = ({
  columns,
  data,
  onRowClick,
  className,
  sortable = false,
  selectable = false,
  onSelectionChange,
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState(new Set());

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = new Set(data.map((item) => item.id));
      setSelectedRows(allIds);
      onSelectionChange?.(Array.from(allIds));
    } else {
      setSelectedRows(new Set());
      onSelectionChange?.([]);
    }
  };

  const handleSelectRow = (id) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
    onSelectionChange?.(Array.from(newSelected));
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="w-full overflow-x-auto">
      {/* Mobile View */}
      <div className="md:hidden">
        {sortedData.map((row, rowIndex) => (
          <motion.div
            key={row.id || rowIndex} // Fallback if `id` is not available
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: rowIndex * 0.05 }}
            className={cn(
              "bg-white rounded-lg shadow-sm p-4",
              onRowClick && "cursor-pointer hover:bg-gray-50"
            )}
            onClick={() => onRowClick?.(row)}
          >
            {selectable && (
              <div className="mb-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  checked={selectedRows.has(row.id)}
                  onChange={() => handleSelectRow(row.id)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            <div className="space-y-2">
              {columns.map((column, colIndex) => (
                <div key={`${column.key}-${row.id || rowIndex}`} className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500">{column.label}</span>
                  <span className="text-sm text-gray-900">
                    {column.render ? column.render(row) : row[column.key]}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop View */}
      <table className={cn("hidden md:table w-full border-collapse", className)}>
        <thead>
          <tr className="bg-gray-50">
            {selectable && (
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  checked={selectedRows.size === data.length}
                  onChange={handleSelectAll}
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={`header-${column.key}`}
                className={cn(
                  "px-4 py-3 text-left text-sm font-medium text-gray-500",
                  sortable && "cursor-pointer hover:text-gray-700"
                )}
                onClick={() => sortable && handleSort(column.key)}
              >
                <div className="flex items-center gap-2">
                  {column.label}
                  {sortable && sortConfig.key === column.key && (
                    <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <motion.tr
              key={row.id || rowIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: rowIndex * 0.05 }}
              className={cn(
                "border-b border-gray-200 hover:bg-gray-50",
                onRowClick && "cursor-pointer"
              )}
              onClick={() => onRowClick?.(row)}
            >
              {selectable && (
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedRows.has(row.id)}
                    onChange={() => handleSelectRow(row.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </td>
              )}
              {columns.map((column, colIndex) => (
                <td
                  key={`${column.key}-${row.id || rowIndex}`}
                  className="px-4 py-3 text-sm text-gray-700"
                >
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table> 
    </div>
  );
};

export default Table;
 
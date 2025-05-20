import { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import { cn } from '../../lib/utils';
import { debounce } from 'lodash';

const SearchInput = ({
  onSearch,
  placeholder = 'Search...',
  className,
  debounceTime = 300,
  initialValue = '',
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  // Create a debounced search function
  const debouncedSearch = useCallback(
    debounce((term) => {
      onSearch(term);
    }, debounceTime),
    [onSearch, debounceTime]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  return (
    <div className={cn("relative", className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search size={16} className="text-gray-400" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={cn(
          "w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm",
          "focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        )}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchInput; 
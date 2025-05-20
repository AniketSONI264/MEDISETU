// components/ui/SearchBar.jsx
import { Search } from 'lucide-react';

const SearchBar = ({ searchQuery, onSearchChange }) => (
  <div className="relative w-full">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
    <input
      type="text"
      placeholder="Search doctors..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default SearchBar;

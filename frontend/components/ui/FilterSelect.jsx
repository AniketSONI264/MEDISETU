// components/ui/FilterSelect.jsx
const FilterSelect = ({ filter, onFilterChange }) => (
    <div className="w-full md:w-48">
      <select
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All Doctors</option>
        <option value="verified">Verified</option>
        <option value="unverified">Unverified</option>
      </select>
    </div>
  );
  
  export default FilterSelect;
  
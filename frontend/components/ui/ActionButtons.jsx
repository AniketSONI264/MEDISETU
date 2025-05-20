// components/ui/ActionButtons.jsx
const ActionButtons = ({ onVerify, onViewDetails, isVerified }) => (
    <div className="flex items-center gap-2">
      <button
        onClick={onVerify}
        className={`px-3 py-1 rounded-lg text-sm font-medium ${
          isVerified
            ? 'bg-red-100 text-red-600 hover:bg-red-200'
            : 'bg-green-100 text-green-600 hover:bg-green-200'
        }`}
      >
        {isVerified ? 'Unverify' : 'Verify'}
      </button>
      <button
        onClick={onViewDetails}
        className="px-3 py-1 rounded-lg text-sm font-medium bg-blue-100 text-blue-600 hover:bg-blue-200"
      >
        View Details
      </button>
    </div>
  );
  
  export default ActionButtons;
  
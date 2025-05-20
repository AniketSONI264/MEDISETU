// components/ui/StatusBadge.jsx
import { ShieldCheck, ShieldX } from 'lucide-react';

const StatusBadge = ({ isVerified }) => (
  <div className="flex items-center gap-2">
    {isVerified ? (
      <span className="flex items-center gap-1 text-green-600">
        <ShieldCheck size={16} />
        Verified
      </span>
    ) : (
      <span className="flex items-center gap-1 text-red-600">
        <ShieldX size={16} />
        Unverified
      </span>
    )}
  </div>
);

export default StatusBadge;

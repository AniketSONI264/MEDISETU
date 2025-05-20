// hooks/admin/useAdminUsers.js
import { useEffect, useState } from "react";
import API from "@/utils/api.js";

const useAdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await  API.get("/admin/users");
      setUsers(res.data.users || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, refetch: fetchUsers };
};

export default useAdminUsers;

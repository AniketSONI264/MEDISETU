import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export function useAdminAccess() {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // Check if user exists and has admin role
      const isUserAdmin = user?.role === 'admin';
      setIsAdmin(isUserAdmin);
      setIsLoading(false);

      // If not admin and not on login page, redirect to home
      if (!isUserAdmin && !window.location.pathname.includes('/login')) {
        router.push('/');
      }
    }
  }, [user, loading, router]);

  return { isAdmin, isLoading };
} 
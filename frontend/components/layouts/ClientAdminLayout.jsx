'use client';

import { usePathname } from 'next/navigation';
import AdminNavDrawer from '@/components/admin/AdminNavDrawer';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ClientAdminLayout({ children }) {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminNavDrawer />
      <main className="flex-1 p-2 pl-0 md:p-0 md:-ml-10 lg:p-8">
        {children}
      </main>
    </div>
  );
}

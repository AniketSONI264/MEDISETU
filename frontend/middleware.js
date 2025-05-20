import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Only handle admin routes
  if (path.startsWith('/admin')) {
    const token = request.cookies.get('token')?.value || '';
    const userRole = request.cookies.get('userRole')?.value || '';

    // If not logged in or not admin, allow the request to proceed
    // We'll handle the access control in the AdminLayout component
    if (!token || userRole !== 'admin') {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/admin/:path*'
  ]
}; 
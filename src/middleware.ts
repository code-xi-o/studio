import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // This is a mock check. In a real app, you'd verify a secure, httpOnly cookie or session.
  // For this example, we can't access localStorage directly in middleware.
  // A common pattern is to redirect to login if a session cookie isn't present.
  // Since this is a simplified example without backend sessions, we'll rely on client-side checks primarily.
  // This middleware serves as a placeholder for where proper server-side session validation would occur.

  if (pathname.startsWith('/admin/dashboard')) {
    // In a real app, you'd check for a valid admin session token (e.g., from a cookie).
    // For this example, if we could access a cookie set by AuthContext (not directly possible in this setup),
    // we would check it here. For now, this middleware won't do much without a proper session mechanism.
    // Client-side checks in AdminLayout will handle redirection for now.
    // console.log('Admin route accessed, ideally check session here.');
  }
  
  if (pathname.startsWith('/profile')) {
    // Similar check for user profile pages.
    // console.log('Profile route accessed, ideally check user session here.');
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*', '/profile/:path*'],
};

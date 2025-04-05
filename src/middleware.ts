import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token;
    const url = req.nextUrl;

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const role = token.role;

    if (url.pathname.startsWith("/superadmin") && role !== "SuperAdmin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (url.pathname.startsWith("/admin") && role !== "Admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (url.pathname.startsWith("/student") && role !== "Student") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      async authorized({ token }) {
        // Check if the user is authenticated
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/superadmin/:path*",
    "/admin/:path*",
    // "/dashboard/customer/:path*",
    "/student/:path*",
    "/staff/:path*",
  ],
};
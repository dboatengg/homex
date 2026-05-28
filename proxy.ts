import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const pathname = req.nextUrl.pathname

    // If a non-admin tries to access /admin, redirect them to dashboard
    if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    // If a non-agent tries to access agent-only routes, redirect to dashboard
    if (
      pathname.startsWith("/dashboard/listings") &&
      token?.role !== "AGENT" &&
      token?.role !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    // Tell NextAuth to use our custom signin page
    pages: {
      signIn: "/signin",
    },
  }
)

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/become-an-agent"],
}
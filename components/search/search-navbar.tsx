"use client"

import Link from "next/link"
import { signOut } from "next-auth/react"
import { User, Menu } from "lucide-react"

interface SearchNavbarProps {
  session: any
}

export function SearchNavbar({ session }: SearchNavbarProps) {
  return (
    <header className="h-16 border-b border-gray-100 px-6 flex items-center justify-between bg-white sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold shrink-0">
        Home<span className="text-amber-500">X</span>
      </Link>

      {/* Center nav */}
      <nav className="hidden md:flex items-center gap-6">
        <Link
          href="/"
          className="text-sm font-medium text-gray-900 border-b-2 border-amber-500 pb-0.5"
        >
          Homes
        </Link>
        <Link
          href="/?type=RENT"
          className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          Rent
        </Link>
        <Link
          href="/?type=SALE"
          className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          Buy
        </Link>
      </nav>

      {/* Right auth */}
      <div className="flex items-center gap-2">
        {session ? (
          <>
            <Link
              href="/dashboard"
              className="hidden sm:block text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Dashboard
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="hidden sm:block text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link
              href="/signin"
              className="hidden sm:block text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/become-an-agent"
              className="text-sm font-medium bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl transition-colors"
            >
              List property
            </Link>
          </>
        )}
        <button className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 hover:shadow-sm transition-shadow ml-1">
          <Menu className="h-4 w-4 text-gray-600" />
          <div className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="h-4 w-4 text-gray-600" />
          </div>
        </button>
      </div>
    </header>
  )
}
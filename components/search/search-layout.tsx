"use client"

import { useState } from "react"
import { SearchNavbar } from "@/components/search/search-navbar"
import { SearchSidebar } from "@/components/search/search-sidebar"
import { SearchGrid } from "@/components/search/search-grid"
import { SearchBar } from "@/components/search/search-bar"
import { CategoryPills } from "@/components/search/category-pills"

interface SearchLayoutProps {
  listings: any[]
  session: any
  filters: {
    type?: string
    category?: string
    city?: string
    region?: string
    minPrice?: string
    maxPrice?: string
    bedrooms?: string
  }
}

export function SearchLayout({ listings, session, filters }: SearchLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <SearchNavbar session={session} />

      {/* Search bar */}
      <div className="border-b border-gray-100 py-4 px-6">
        <SearchBar filters={filters} />
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-72 shrink-0 border-r border-gray-100 flex-col overflow-y-auto">
          <SearchSidebar filters={filters} />
        </aside>

        {/* Right panel */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Category pills */}
          <div className="border-b border-gray-100 px-6 py-3">
            <CategoryPills active={filters.category} />
          </div>

          {/* Listings grid */}
          <div className="flex-1 overflow-y-auto">
            <SearchGrid listings={listings} />
          </div>
        </div>
      </div>
    </div>
  )
}
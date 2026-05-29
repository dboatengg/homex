"use client"

import { useState } from "react"
import { SearchNavbar } from "@/components/search/search-navbar"
import { SearchSidebar } from "@/components/search/search-sidebar"
import { SearchGrid } from "@/components/search/search-grid"
import { SearchBar } from "@/components/search/search-bar"
import { CategoryPills } from "@/components/search/category-pills"
import { SlidersHorizontal } from "lucide-react"

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
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <SearchNavbar session={session} />

      {/* Search bar */}
      <div className="border-b border-gray-100 py-4 px-6">
        <SearchBar filters={filters} />
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar — passes mobile state down */}
        <SearchSidebar
          filters={filters}
          mobileOpen={mobileFiltersOpen}
          onMobileClose={() => setMobileFiltersOpen(false)}
        />

        {/* Right panel */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Category pills + mobile filter trigger */}
          <div className="border-b border-gray-100 px-4 py-3 flex items-center gap-3">
            {/* Mobile filter button — always visible on small screens */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 hover:border-gray-300 shrink-0"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>

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
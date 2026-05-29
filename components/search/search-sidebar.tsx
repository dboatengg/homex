"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState, Suspense } from "react"
import { SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const GHANA_REGIONS = [
  "Greater Accra",
  "Ashanti",
  "Western",
  "Central",
  "Eastern",
  "Northern",
  "Upper East",
  "Upper West",
  "Volta",
  "Brong-Ahafo",
  "Western North",
]

interface SearchSidebarProps {
  filters: {
    type?: string
    region?: string
    bedrooms?: string
  }
}

function SearchSidebarInner({ filters }: SearchSidebarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [collapsed, setCollapsed] = useState(false)

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value && value !== "all") {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      router.push(`/?${params.toString()}`)
    },
    [router, searchParams]
  )

  const clearAll = () => router.push("/")
  const hasFilters = searchParams.toString().length > 0

  return (
    <div className="relative flex">
      {/* Sidebar panel */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out border-r border-gray-100 bg-white",
          collapsed ? "w-0 opacity-0" : "w-72 opacity-100"
        )}
      >
        <div className="w-72 h-full overflow-y-auto">
          <div className="p-5 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-semibold text-gray-900">
                  Filters
                </span>
              </div>
              {hasFilters && (
                <button
                  onClick={clearAll}
                  className="text-xs font-medium text-amber-500 hover:text-amber-600 transition-colors underline underline-offset-2"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Listing type */}
            <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Listing type
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "", label: "All" },
                  { value: "RENT", label: "Rent" },
                  { value: "SALE", label: "Buy" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => updateFilter("type", opt.value)}
                    className={cn(
                      "py-2.5 rounded-xl text-sm font-semibold transition-all duration-150",
                      (filters.type ?? "") === opt.value
                        ? "bg-gray-900 text-white shadow-sm"
                        : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bedrooms */}
            <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Bedrooms
              </p>
              <div className="flex gap-2">
                {[
                  { value: "", label: "Any" },
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                  { value: "4", label: "4+" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => updateFilter("bedrooms", opt.value)}
                    className={cn(
                      "flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150",
                      (filters.bedrooms ?? "") === opt.value
                        ? "bg-amber-500 text-white shadow-sm"
                        : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Region */}
            <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Region
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => updateFilter("region", "")}
                  className={cn(
                    "col-span-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150",
                    !filters.region
                      ? "bg-gray-900 text-white shadow-sm"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
                  )}
                >
                  All regions
                </button>
                {GHANA_REGIONS.map((region) => (
                  <button
                    key={region}
                    onClick={() => updateFilter("region", region)}
                    className={cn(
                      "py-2.5 px-2 rounded-xl text-xs font-semibold transition-all duration-150 truncate",
                      filters.region === region
                        ? "bg-gray-900 text-white shadow-sm"
                        : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
                    )}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Collapse toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={cn(
          "absolute top-6 -right-3.5 z-10 h-7 w-7 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:shadow-md transition-all duration-200",
        )}
      >
        {collapsed ? (
          <ChevronRight className="h-3.5 w-3.5 text-gray-600" />
        ) : (
          <ChevronLeft className="h-3.5 w-3.5 text-gray-600" />
        )}
      </button>
    </div>
  )
}

export function SearchSidebar({ filters }: SearchSidebarProps) {
  return (
    <Suspense fallback={<div className="w-72 border-r border-gray-100" />}>
      <SearchSidebarInner filters={filters} />
    </Suspense>
  )
}
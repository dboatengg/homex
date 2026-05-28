"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState, Suspense } from "react"
import { SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react"
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

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-gray-100 py-5">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full mb-3"
      >
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        {open ? (
          <ChevronUp className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        )}
      </button>
      {open && children}
    </div>
  )
}

function SearchSidebarInner({ filters }: SearchSidebarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

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
    <div className="px-5 pt-5 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-semibold text-gray-900">Filters</span>
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
      <FilterSection title="Listing type">
        <div className="space-y-1">
          {[
            { value: "", label: "All" },
            { value: "RENT", label: "For Rent" },
            { value: "SALE", label: "For Sale" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateFilter("type", opt.value)}
              className={cn(
                "w-full text-left px-3 py-2.5 rounded-xl text-sm transition-colors",
                (filters.type ?? "") === opt.value
                  ? "bg-gray-900 text-white font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Bedrooms */}
      <FilterSection title="Bedrooms">
        <div className="flex flex-wrap gap-2">
          {["any", "1", "2", "3", "4+"].map((opt) => (
            <button
              key={opt}
              onClick={() =>
                updateFilter(
                  "bedrooms",
                  opt === "any" ? "" : opt.replace("+", "")
                )
              }
              className={cn(
                "px-3 py-1.5 rounded-xl text-sm font-medium border transition-colors",
                (filters.bedrooms ?? "any") === opt ||
                  (!filters.bedrooms && opt === "any")
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-200 text-gray-600 hover:border-gray-400"
              )}
            >
              {opt === "any" ? "Any" : `${opt} bed`}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Region */}
      <FilterSection title="Region" defaultOpen={false}>
        <div className="space-y-1">
          <button
            onClick={() => updateFilter("region", "")}
            className={cn(
              "w-full text-left px-3 py-2.5 rounded-xl text-sm transition-colors",
              !filters.region
                ? "bg-gray-900 text-white font-medium"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            All regions
          </button>
          {GHANA_REGIONS.map((region) => (
            <button
              key={region}
              onClick={() => updateFilter("region", region)}
              className={cn(
                "w-full text-left px-3 py-2.5 rounded-xl text-sm transition-colors",
                filters.region === region
                  ? "bg-gray-900 text-white font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              {region}
            </button>
          ))}
        </div>
      </FilterSection>
    </div>
  )
}

export function SearchSidebar({ filters }: SearchSidebarProps) {
  return (
    <Suspense fallback={<div />}>
      <SearchSidebarInner filters={filters} />
    </Suspense>
  )
}
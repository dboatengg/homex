"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Search, MapPin } from "lucide-react"

interface SearchBarProps {
  filters: {
    city?: string
    minPrice?: string
    maxPrice?: string
    type?: string
  }
}

export function SearchBar({ filters }: SearchBarProps) {
  const router = useRouter()
  const [city, setCity] = useState(filters.city ?? "")
  const [minPrice, setMinPrice] = useState(filters.minPrice ?? "")
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice ?? "")

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (city) params.set("city", city)
    if (minPrice) params.set("minPrice", minPrice)
    if (maxPrice) params.set("maxPrice", maxPrice)
    if (filters.type) params.set("type", filters.type)
    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="flex items-stretch max-w-2xl mx-auto w-full bg-white border-2 border-gray-200 hover:border-gray-300 focus-within:border-amber-400 rounded-2xl overflow-hidden transition-colors shadow-sm">
      {/* City */}
      <div className="flex items-center gap-3 flex-1 px-5 py-3">
        <MapPin className="h-4 w-4 text-amber-500 shrink-0" />
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">
            Where
          </span>
          <input
            type="text"
            placeholder="Search city or region"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="text-sm text-gray-700 outline-none placeholder:text-gray-400 bg-transparent w-full mt-0.5"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="w-px bg-gray-200 my-3" />

      {/* Min price */}
      <div className="hidden sm:flex flex-col justify-center px-5 py-3 w-36">
        <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">
          Min price
        </span>
        <input
          type="number"
          placeholder="GHS 0"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="text-sm text-gray-700 outline-none placeholder:text-gray-400 bg-transparent mt-0.5"
        />
      </div>

      {/* Divider */}
      <div className="w-px bg-gray-200 my-3 hidden sm:block" />

      {/* Max price */}
      <div className="hidden sm:flex flex-col justify-center px-5 py-3 w-36">
        <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">
          Max price
        </span>
        <input
          type="number"
          placeholder="Any"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="text-sm text-gray-700 outline-none placeholder:text-gray-400 bg-transparent mt-0.5"
        />
      </div>

      {/* Search button */}
      <div className="flex items-center pr-3 pl-2">
        <button
          onClick={handleSearch}
          className="h-11 px-5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl flex items-center gap-2 font-medium text-sm transition-colors shrink-0"
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:block">Search</span>
        </button>
      </div>
    </div>
  )
}
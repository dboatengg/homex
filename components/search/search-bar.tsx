"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Search } from "lucide-react"

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
    <div className="flex items-stretch max-w-4xl mx-auto w-full bg-white border border-gray-200 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden transition-shadow hover:shadow-[0_6px_28px_rgba(0,0,0,0.12)]">
      
      {/* Where — wider field */}
      <div className="flex flex-col justify-center flex-[2] px-6 py-3">
        <span className="text-xs font-medium text-gray-500">Where</span>
        <input
          type="text"
          placeholder="Search city or region"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="text-sm text-gray-800 outline-none placeholder:text-gray-400 bg-transparent mt-0.5 w-full"
        />
      </div>

      {/* Divider */}
      <div className="flex items-center py-4">
        <div className="w-px h-full bg-gray-200" />
      </div>

      {/* Min price */}
      <div className="hidden sm:flex flex-col justify-center px-6 py-3 flex-1">
        <span className="text-xs font-medium text-gray-500">Min price</span>
        <input
          type="number"
          placeholder="GHS 0"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="text-sm text-gray-800 outline-none placeholder:text-gray-400 bg-transparent mt-0.5 w-full"
        />
      </div>

      {/* Divider */}
      <div className="hidden sm:flex items-center py-4">
        <div className="w-px h-full bg-gray-200" />
      </div>

      {/* Max price */}
      <div className="hidden sm:flex flex-col justify-center px-6 py-3 flex-1">
        <span className="text-xs font-medium text-gray-500">Max price</span>
        <input
          type="number"
          placeholder="Any"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="text-sm text-gray-800 outline-none placeholder:text-gray-400 bg-transparent mt-0.5 w-full"
        />
      </div>

      {/* Search button — icon only */}
      <div className="flex items-center px-3">
        <button
          onClick={handleSearch}
          className="h-12 w-12 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl flex items-center justify-center transition-colors shrink-0"
        >
          <Search className="h=5 w-5" />
        </button>
      </div>
    </div>
  )
}
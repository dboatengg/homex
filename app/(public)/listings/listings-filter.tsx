"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function ListingsFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [city, setCity] = useState(searchParams.get("city") ?? "")
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "")
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "")

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value && value !== "all") {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      router.push(`/listings?${params.toString()}`)
    },
    [router, searchParams]
  )

  // Debounce city and price inputs — waits 500ms after user stops typing
  useEffect(() => {
    const timeout = setTimeout(() => {
      updateFilter("city", city)
    }, 500)
    return () => clearTimeout(timeout)
  }, [city])

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateFilter("minPrice", minPrice)
    }, 500)
    return () => clearTimeout(timeout)
  }, [minPrice])

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateFilter("maxPrice", maxPrice)
    }, 500)
    return () => clearTimeout(timeout)
  }, [maxPrice])

  const clearFilters = () => {
    setCity("")
    setMinPrice("")
    setMaxPrice("")
    router.push("/listings")
  }

  const hasFilters = searchParams.toString().length > 0

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* Type filter */}
      <Select
        value={searchParams.get("type") ?? "all"}
        onValueChange={(v) => updateFilter("type", v)}
      >
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="RENT">Rent</SelectItem>
          <SelectItem value="SALE">Sale</SelectItem>
        </SelectContent>
      </Select>

      {/* Category filter */}
      <Select
        value={searchParams.get("category") ?? "all"}
        onValueChange={(v) => updateFilter("category", v)}
      >
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="HOUSE">House</SelectItem>
          <SelectItem value="APARTMENT">Apartment</SelectItem>
          <SelectItem value="SELF_CONTAINED">Self Contained</SelectItem>
          <SelectItem value="COMPOUND_HOUSE">Compound House</SelectItem>
          <SelectItem value="LAND">Land</SelectItem>
          <SelectItem value="TOWNHOUSE">Townhouse</SelectItem>
        </SelectContent>
      </Select>

      {/* Bedrooms filter */}
      <Select
        value={searchParams.get("bedrooms") ?? "all"}
        onValueChange={(v) => updateFilter("bedrooms", v)}
      >
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Bedrooms" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Any Beds</SelectItem>
          <SelectItem value="1">1+ Beds</SelectItem>
          <SelectItem value="2">2+ Beds</SelectItem>
          <SelectItem value="3">3+ Beds</SelectItem>
          <SelectItem value="4">4+ Beds</SelectItem>
        </SelectContent>
      </Select>

      {/* City search */}
      <Input
        placeholder="Search city..."
        className="w-40"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      {/* Min price */}
      <Input
        placeholder="Min price"
        type="number"
        className="w-32"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />

      {/* Max price */}
      <Input
        placeholder="Max price"
        type="number"
        className="w-32"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      {/* Clear filters */}
      {hasFilters && (
        <Button variant="outline" size="sm" onClick={clearFilters}>
          Clear filters
        </Button>
      )}
    </div>
  )
}
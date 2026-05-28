"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
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

  // Updates a single filter param while preserving others
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

  const clearFilters = () => {
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
        defaultValue={searchParams.get("city") ?? ""}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updateFilter("city", (e.target as HTMLInputElement).value)
          }
        }}
      />

      {/* Min price */}
      <Input
        placeholder="Min price"
        type="number"
        className="w-32"
        defaultValue={searchParams.get("minPrice") ?? ""}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updateFilter("minPrice", (e.target as HTMLInputElement).value)
          }
        }}
      />

      {/* Max price */}
      <Input
        placeholder="Max price"
        type="number"
        className="w-32"
        defaultValue={searchParams.get("maxPrice") ?? ""}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updateFilter("maxPrice", (e.target as HTMLInputElement).value)
          }
        }}
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
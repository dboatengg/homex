"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Home, Building2, Layers, Trees, Castle, LandPlot } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = [
  { value: "", label: "All", icon: Home },
  { value: "HOUSE", label: "House", icon: Home },
  { value: "APARTMENT", label: "Apartment", icon: Building2 },
  { value: "SELF_CONTAINED", label: "Self Contained", icon: Layers },
  { value: "COMPOUND_HOUSE", label: "Compound House", icon: Castle },
  { value: "LAND", label: "Land", icon: Trees },
  { value: "TOWNHOUSE", label: "Townhouse", icon: LandPlot },
]

function CategoryPillsInner({ active }: { active?: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleClick = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set("category", value)
    } else {
      params.delete("category")
    }
    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => handleClick(cat.value)}
          className={cn(
            "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors shrink-0",
            (active ?? "") === cat.value
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
        >
          <cat.icon className="h-3.5 w-3.5" />
          {cat.label}
        </button>
      ))}
    </div>
  )
}

export function CategoryPills({ active }: { active?: string }) {
  return (
    <Suspense fallback={<div className="h-9" />}>
      <CategoryPillsInner active={active} />
    </Suspense>
  )
}
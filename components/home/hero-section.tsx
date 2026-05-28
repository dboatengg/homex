"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [type, setType] = useState("all")

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (query) params.set("city", query)
    if (type !== "all") params.set("type", type)
    router.push(`/listings?${params.toString()}`)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1600')",
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/80" />
      {/* Amber gradient glow at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
          <MapPin className="h-3.5 w-3.5" />
          Properties across Ghana
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
          Find Your Next
          <br />
          <span className="text-primary">Home in Ghana</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Browse thousands of verified properties for rent and sale across
          Accra, Kumasi, Tema, and beyond.
        </p>

        {/* Search bar */}
        <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
          {/* Type toggle */}
          <div className="flex rounded-xl border border-border bg-card overflow-hidden shrink-0">
            {["all", "RENT", "SALE"].map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
                  type === t
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t === "all" ? "All" : t === "RENT" ? "Rent" : "Buy"}
              </button>
            ))}
          </div>

          {/* City input */}
          <div className="flex-1 flex items-center gap-2 border border-border bg-card rounded-xl px-4">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search by city — Accra, Kumasi, Tema..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          <Button onClick={handleSearch} size="lg" className="shrink-0 rounded-xl">
            Search
          </Button>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 pt-4">
          {[
            { label: "Active Listings", value: "500+" },
            { label: "Cities Covered", value: "12+" },
            { label: "Verified Agents", value: "200+" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
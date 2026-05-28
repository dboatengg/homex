"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Search, MapPin } from "lucide-react"

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
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1600')",
        }}
      />

      {/* Strong dark overlay so text is readable */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-1.5 rounded-full text-sm font-medium">
          <MapPin className="h-3.5 w-3.5" />
          Properties across Ghana
        </div>

        {/* Headline — white on dark background */}
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
          Find Your Perfect
          <br />
          Home in Ghana
        </h1>

        <p className="text-lg text-white/80 max-w-xl mx-auto">
          Browse verified properties for rent and sale across Accra, Kumasi,
          Tema, and beyond.
        </p>

        {/* Airbnb-style search bar — white floating card */}
        <div className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col sm:flex-row gap-0 max-w-2xl mx-auto overflow-hidden">
          {/* Type selector */}
          <div className="flex border-b sm:border-b-0 sm:border-r border-gray-200 shrink-0">
            {["all", "RENT", "SALE"].map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-4 py-3 text-sm font-medium transition-colors rounded-xl ${
                  type === t
                    ? "bg-primary text-white"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {t === "all" ? "All" : t === "RENT" ? "Rent" : "Buy"}
              </button>
            ))}
          </div>

          {/* City input */}
          <div className="flex-1 flex items-center gap-2 px-4">
            <Search className="h-4 w-4 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search by city — Accra, Kumasi, Tema..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 bg-transparent"
            />
          </div>

          {/* Search button */}
          <button
            onClick={handleSearch}
            className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-xl transition-colors shrink-0 m-1"
          >
            Search
          </button>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-10 pt-2">
          {[
            { label: "Active Listings", value: "500+" },
            { label: "Cities Covered", value: "12+" },
            { label: "Verified Agents", value: "200+" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-white/60 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
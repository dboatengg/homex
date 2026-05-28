import Link from "next/link"
import { ListingCard } from "@/app/(public)/listings/listing-card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface FeaturedListingsProps {
  listings: any[]
}

export function FeaturedListings({ listings }: FeaturedListingsProps) {
  if (listings.length === 0) return null

  return (
    <section className="max-w-7xl mx-auto px-4 py-20 space-y-10">
      {/* Section header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-primary text-sm font-medium uppercase tracking-widest mb-2">
            Featured
          </p>
          <h2 className="text-4xl font-bold">
            Handpicked
            <br />
            Properties
          </h2>
        </div>
        <Button asChild variant="outline" className="hidden sm:flex gap-2">
          <Link href="/listings">
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      {/* Mobile view all */}
      <div className="sm:hidden">
        <Button asChild variant="outline" className="w-full gap-2">
          <Link href="/listings">
            View all properties
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
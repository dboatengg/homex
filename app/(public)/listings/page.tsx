import { db } from "@/lib/db"
import { ListingCard } from "./listing-card"
import { ListingsFilter } from "./listings-filter"
import { Prisma } from "@prisma/client"

interface SearchParams {
  type?: string
  category?: string
  city?: string
  minPrice?: string
  maxPrice?: string
  bedrooms?: string
}

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  // Await searchParams — required in Next.js 16
  const filters = await searchParams

  // Build dynamic where clause based on active filters
  const where = {
  status: "ACTIVE" as const,
  ...(filters.type && { type: filters.type as "RENT" | "SALE" }),
  ...(filters.category && { category: filters.category as "HOUSE" | "APARTMENT" | "SELF_CONTAINED" | "COMPOUND_HOUSE" | "LAND" | "TOWNHOUSE" }),
  ...(filters.city && {
    city: { contains: filters.city, mode: "insensitive" as const },
  }),
  ...(filters.bedrooms && {
    bedrooms: { gte: parseInt(filters.bedrooms) },
  }),
  ...((filters.minPrice || filters.maxPrice) && {
    price: {
      ...(filters.minPrice && { gte: parseFloat(filters.minPrice) }),
      ...(filters.maxPrice && { lte: parseFloat(filters.maxPrice) }),
    },
  }),
} satisfies Prisma.ListingWhereInput

  const listings = await db.listing.findMany({
    where,
    include: { agent: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Properties</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {listings.length} properties found across Ghana
        </p>
      </div>

      {/* Filters */}
      <ListingsFilter />

      {/* Listings grid */}
      {listings.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground">
            No properties found. Try adjusting your filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  )
}
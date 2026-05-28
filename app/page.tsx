import { db } from "@/lib/db"
import { SearchLayout } from "@/components/search/search-layout"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Prisma } from "@prisma/client"

interface SearchParams {
  type?: string
  category?: string
  city?: string
  region?: string
  minPrice?: string
  maxPrice?: string
  bedrooms?: string
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const session = await getServerSession(authOptions)
  const filters = await searchParams

  const where = {
    status: "ACTIVE" as const,
    ...(filters.type && { type: filters.type as "RENT" | "SALE" }),
    ...(filters.category && {
      category: filters.category as
        | "HOUSE"
        | "APARTMENT"
        | "SELF_CONTAINED"
        | "COMPOUND_HOUSE"
        | "LAND"
        | "TOWNHOUSE",
    }),
    ...(filters.city && {
      city: { contains: filters.city, mode: "insensitive" as const },
    }),
    ...(filters.region && {
      region: { contains: filters.region, mode: "insensitive" as const },
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
    <SearchLayout
      listings={listings}
      session={session}
      filters={filters}
    />
  )
}
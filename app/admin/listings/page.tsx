import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { AdminListingCard } from "../listing-card"

export default async function AdminListingsPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "ADMIN") redirect("/dashboard")

  const listings = await db.listing.findMany({
    include: { agent: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Listings</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Approve, reject, or suspend property listings
        </p>
      </div>

      {listings.length === 0 ? (
        <p className="text-muted-foreground">No listings yet.</p>
      ) : (
        <div className="space-y-4">
          {listings.map((listing) => (
            <AdminListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  )
}
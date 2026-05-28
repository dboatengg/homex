import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { ListingCard } from "@/app/(public)/listings/listing-card"

export default async function SavedPropertiesPage() {
  const session = await getServerSession(authOptions)

  if (!session) redirect("/signin")

  const savedProperties = await db.savedProperty.findMany({
    where: { userId: session.user.id },
    include: {
      listing: {
        include: { agent: true },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Saved Properties</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {savedProperties.length} saved{" "}
          {savedProperties.length === 1 ? "property" : "properties"}
        </p>
      </div>

      {savedProperties.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground">
            You haven&apos;t saved any properties yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedProperties.map(({ listing }) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  )
}
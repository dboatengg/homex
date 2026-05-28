import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AgentListingCard } from "../agent-listing-card"
import { PlusCircle } from "lucide-react"

export default async function AgentListingsPage() {
  const session = await getServerSession(authOptions)

  if (!session) redirect("/signin")
  if (session.user.role !== "AGENT" && session.user.role !== "ADMIN") {
    redirect("/dashboard")
  }

  const listings = await db.listing.findMany({
    where: { agentId: session.user.id },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Listings</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {listings.length} total{" "}
            {listings.length === 1 ? "listing" : "listings"}
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/listings/new">
            <PlusCircle className="h-4 w-4 mr-2" />
            New Listing
          </Link>
        </Button>
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-20 space-y-3">
          <p className="text-muted-foreground">
            You haven&apos;t created any listings yet.
          </p>
          <Button asChild variant="outline">
            <Link href="/dashboard/listings/new">Create your first listing</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {listings.map((listing) => (
            <AgentListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  )
}
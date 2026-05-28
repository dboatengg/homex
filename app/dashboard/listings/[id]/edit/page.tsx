import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { db } from "@/lib/db"
import { ListingForm } from "../../../listing-form"

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getServerSession(authOptions)
  const { id } = await params

  if (!session) redirect("/signin")
  if (session.user.role !== "AGENT" && session.user.role !== "ADMIN") {
    redirect("/dashboard")
  }

  const listing = await db.listing.findUnique({
    where: { id, agentId: session.user.id },
  })

  if (!listing) notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Listing</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Update your listing details below.
        </p>
      </div>
      <ListingForm listing={listing} />
    </div>
  )
}
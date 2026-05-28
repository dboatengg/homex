import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { ListingForm } from "../../listing-form"

export default async function NewListingPage() {
  const session = await getServerSession(authOptions)

  if (!session) redirect("/signin")
  if (session.user.role !== "AGENT" && session.user.role !== "ADMIN") {
    redirect("/dashboard")
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Create a Listing</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Fill in the details below. Your listing will be reviewed before going
          live.
        </p>
      </div>
      <ListingForm />
    </div>
  )
}
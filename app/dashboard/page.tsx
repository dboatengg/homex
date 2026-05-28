import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { Heart, MessageSquare, Home, Clock } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) redirect("/signin")

  // Redirect admins to their own dedicated area
  if (session.user.role === "ADMIN") redirect("/admin")

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      savedProperties: true,
      receivedMessages: true,
      listings: true,
      agentApplication: true,
    },
  })

  if (!user) redirect("/signin")

  const isAgent = session.user.role === "AGENT"

  // Stats differ based on whether the user is a regular user or an agent
  const stats = isAgent
    ? [
        {
          label: "Total Listings",
          value: user.listings.length,
          icon: Home,
          href: "/dashboard/listings",
        },
        {
          label: "Pending Approval",
          value: user.listings.filter((l) => l.status === "PENDING").length,
          icon: Clock,
          href: "/dashboard/listings",
        },
        {
          label: "Messages",
          value: user.receivedMessages.filter((m) => !m.read).length,
          icon: MessageSquare,
          href: "/dashboard/messages",
        },
      ]
    : [
        {
          label: "Saved Properties",
          value: user.savedProperties.length,
          icon: Heart,
          href: "/dashboard/saved",
        },
        {
          label: "Unread Messages",
          value: user.receivedMessages.filter((m) => !m.read).length,
          icon: MessageSquare,
          href: "/dashboard/messages",
        },
      ]

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      {/* Welcome header */}
      <div>
        <h1 className="text-2xl font-bold">
          Welcome back, {user.name?.split(" ")[0]}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {isAgent
            ? "Manage your listings and messages"
            : "Browse properties and manage your saved listings"}
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="border rounded-xl p-5 hover:border-primary transition-colors space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-3xl font-bold">{stat.value}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {isAgent ? (
            <>
              <Link
                href="/dashboard/listings/new"
                className="border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-medium">Create a listing</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Add a new property for rent or sale
                </p>
              </Link>
              <Link
                href="/dashboard/listings"
                className="border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-medium">Manage listings</p>
                <p className="text-sm text-muted-foreground mt-1">
                  View and edit your property listings
                </p>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/listings"
                className="border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-medium">Browse properties</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Find your next home across Ghana
                </p>
              </Link>
              {!user.agentApplication && (
                <Link
                  href="/become-an-agent"
                  className="border rounded-xl p-4 hover:border-primary transition-colors"
                >
                  <p className="font-medium">Become an agent</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    List properties and reach more buyers
                  </p>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
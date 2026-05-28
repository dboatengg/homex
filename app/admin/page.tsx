import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { Home, Users, UserCheck, Clock } from "lucide-react"
import Link from "next/link"

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "ADMIN") redirect("/dashboard")

  // Fetch all platform stats in parallel for performance
  const [
    totalListings,
    pendingListings,
    totalUsers,
    pendingApplications,
  ] = await Promise.all([
    db.listing.count(),
    db.listing.count({ where: { status: "PENDING" } }),
    db.user.count(),
    db.agentApplication.count({ where: { status: "PENDING" } }),
  ])

  const stats = [
    {
      label: "Total Listings",
      value: totalListings,
      icon: Home,
      href: "/admin/listings",
    },
    {
      label: "Pending Listings",
      value: pendingListings,
      icon: Clock,
      href: "/admin/listings",
    },
    {
      label: "Total Users",
      value: totalUsers,
      icon: Users,
      href: "/admin/users",
    },
    {
      label: "Agent Applications",
      value: pendingApplications,
      icon: UserCheck,
      href: "/admin/agents",
    },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Admin Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Platform stats and pending actions
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
    </div>
  )
}
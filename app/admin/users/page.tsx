import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { AdminUserCard } from "../user-card"

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "ADMIN") redirect("/dashboard")

  const users = await db.user.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage all registered users on the platform
        </p>
      </div>

      {users.length === 0 ? (
        <p className="text-muted-foreground">No users yet.</p>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <AdminUserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  )
}
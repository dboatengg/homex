import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { AgentApplicationCard } from "@/components/admin/agent-application-card"

export default async function AdminAgentsPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "ADMIN") redirect("/dashboard")

  const applications = await db.agentApplication.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Agent Applications</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Review and approve or reject agent applications
        </p>
      </div>

      {applications.length === 0 ? (
        <p className="text-muted-foreground">No applications yet.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((application) => (
            <AgentApplicationCard
              key={application.id}
              application={application}
            />
          ))}
        </div>
      )}
    </div>
  )
}
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Application {
  id: string
  phone: string
  bio: string
  idNumber: string
  status: string
  createdAt: Date
  user: {
    id: string
    name: string | null
    email: string | null
  }
}

export function AgentApplicationCard({
  application,
}: {
  application: Application
}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<"approve" | "reject" | null>(null)

  const handleAction = async (action: "approve" | "reject") => {
    setIsLoading(action)

    try {
      await fetch(`/api/admin/agents/${application.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      })

      // Refresh the page to show updated status
      router.refresh()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(null)
    }
  }

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    APPROVED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
  }

  return (
    <div className="border rounded-xl p-5 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold">{application.user.name}</p>
          <p className="text-sm text-muted-foreground">{application.user.email}</p>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            statusColors[application.status]
          }`}
        >
          {application.status}
        </span>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-muted-foreground">Phone</p>
          <p className="font-medium">{application.phone}</p>
        </div>
        <div>
          <p className="text-muted-foreground">ID Number</p>
          <p className="font-medium">{application.idNumber}</p>
        </div>
      </div>

      <div className="text-sm">
        <p className="text-muted-foreground">Bio</p>
        <p className="mt-1">{application.bio}</p>
      </div>

      {/* Actions — only show if application is still pending */}
      {application.status === "PENDING" && (
        <div className="flex gap-3 pt-2">
          <Button
            size="sm"
            onClick={() => handleAction("approve")}
            disabled={isLoading !== null}
          >
            {isLoading === "approve" ? "Approving..." : "Approve"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleAction("reject")}
            disabled={isLoading !== null}
          >
            {isLoading === "reject" ? "Rejecting..." : "Reject"}
          </Button>
        </div>
      )}
    </div>
  )
}
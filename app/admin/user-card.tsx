"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"

interface UserCardProps {
  user: {
    id: string
    name: string | null
    email: string | null
    role: string
    createdAt: Date
  }
}

export function AdminUserCard({ user }: UserCardProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleDeactivate = async () => {
    setIsLoading(true)

    try {
      await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "deactivate" }),
      })

      router.refresh()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const roleColors: Record<string, string> = {
    USER: "bg-gray-100 text-gray-800",
    AGENT: "bg-blue-100 text-blue-800",
    ADMIN: "bg-purple-100 text-purple-800",
  }

  return (
    <div className="border rounded-xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
          <User className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <p className="font-medium text-sm">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            roleColors[user.role]
          }`}
        >
          {user.role}
        </span>
        {user.role !== "ADMIN" && (
          <Button
            size="sm"
            variant="outline"
            onClick={handleDeactivate}
            disabled={isLoading}
          >
            {isLoading ? "..." : "Deactivate"}
          </Button>
        )}
      </div>
    </div>
  )
}
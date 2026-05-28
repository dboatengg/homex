"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MapPin, User } from "lucide-react"

interface Listing {
  id: string
  title: string
  price: number
  type: string
  category: string
  status: string
  city: string
  region: string
  createdAt: Date
  agent: {
    name: string | null
    email: string | null
  }
}

export function AdminListingCard({ listing }: { listing: Listing }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const handleAction = async (action: string) => {
    setIsLoading(action)

    try {
      await fetch(`/api/admin/listings/${listing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      })

      router.refresh()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(null)
    }
  }

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    ACTIVE: "bg-green-100 text-green-800",
    SOLD: "bg-blue-100 text-blue-800",
    RENTED: "bg-purple-100 text-purple-800",
  }

  return (
    <div className="border rounded-xl p-5 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold">{listing.title}</p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
            <MapPin className="h-3 w-3" />
            {listing.city}, {listing.region}
          </div>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            statusColors[listing.status]
          }`}
        >
          {listing.status}
        </span>
      </div>

      {/* Details */}
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-muted-foreground">Price</p>
          <p className="font-medium">GHS {listing.price.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Type</p>
          <p className="font-medium capitalize">{listing.type.toLowerCase()}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Category</p>
          <p className="font-medium capitalize">
            {listing.category.replace("_", " ").toLowerCase()}
          </p>
        </div>
      </div>

      {/* Agent */}
      <div className="flex items-center gap-2 text-sm">
        <User className="h-3 w-3 text-muted-foreground" />
        <span className="text-muted-foreground">Agent:</span>
        <span className="font-medium">{listing.agent.name}</span>
        <span className="text-muted-foreground">{listing.agent.email}</span>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        {listing.status === "PENDING" && (
          <Button
            size="sm"
            onClick={() => handleAction("approve")}
            disabled={isLoading !== null}
          >
            {isLoading === "approve" ? "Approving..." : "Approve"}
          </Button>
        )}
        {listing.status === "ACTIVE" && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleAction("suspend")}
            disabled={isLoading !== null}
          >
            {isLoading === "suspend" ? "Suspending..." : "Suspend"}
          </Button>
        )}
        {listing.status !== "PENDING" && listing.status !== "ACTIVE" ? null : (
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleAction("reject")}
            disabled={isLoading !== null}
          >
            {isLoading === "reject" ? "Rejecting..." : "Reject"}
          </Button>
        )}
      </div>
    </div>
  )
}
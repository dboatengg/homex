"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { MapPin, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AgentListingCardProps {
  listing: {
    id: string
    title: string
    price: number
    type: string
    category: string
    status: string
    city: string
    region: string
    images: string[]
    createdAt: Date
  }
}

export function AgentListingCard({ listing }: AgentListingCardProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this listing?")) return
    setIsDeleting(true)

    try {
      await fetch(`/api/listings/${listing.id}`, { method: "DELETE" })
      router.refresh()
    } catch (error) {
      console.error(error)
    } finally {
      setIsDeleting(false)
    }
  }

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    ACTIVE: "bg-green-100 text-green-800",
    SOLD: "bg-blue-100 text-blue-800",
    RENTED: "bg-purple-100 text-purple-800",
  }

  return (
    <div className="border rounded-xl overflow-hidden flex flex-col sm:flex-row">
      {/* Image */}
      <div className="relative h-40 sm:h-auto sm:w-48 shrink-0">
        <Image
          src={listing.images[0] ?? "/placeholder.jpg"}
          alt={listing.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold">{listing.title}</h3>
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 ${
                statusColors[listing.status]
              }`}
            >
              {listing.status}
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {listing.city}, {listing.region}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-semibold">
            GHS {listing.price.toLocaleString()}
            {listing.type === "RENT" && (
              <span className="text-muted-foreground font-normal text-sm">
                /mo
              </span>
            )}
          </p>

          <div className="flex items-center gap-2">
            <Button asChild size="sm" variant="outline">
              <Link href={`/dashboard/listings/${listing.id}/edit`}>
                <Pencil className="h-3 w-3 mr-1" />
                Edit
              </Link>
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <Trash2 className="h-3 w-3 mr-1" />
              {isDeleting ? "..." : "Delete"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
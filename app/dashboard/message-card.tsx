"use client"

import { useState } from "react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { User, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MessageCardProps {
  message: {
    id: string
    body: string
    read: boolean
    createdAt: Date
    sender: {
      name: string | null
      email: string | null
    }
    listing: {
      id: string
      title: string
    }
  }
}

export function MessageCard({ message }: MessageCardProps) {
  const [read, setRead] = useState(message.read)
  const [isLoading, setIsLoading] = useState(false)

  const markAsRead = async () => {
    if (read) return
    setIsLoading(true)

    try {
      await fetch(`/api/messages/${message.id}/read`, {
        method: "PATCH",
      })
      setRead(true)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={cn(
        "border rounded-xl p-5 space-y-3 transition-colors",
        !read && "border-primary/50 bg-primary/5"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center shrink-0">
            <User className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium text-sm">{message.sender.name}</p>
            <p className="text-xs text-muted-foreground">
              {message.sender.email}
            </p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground shrink-0">
          {formatDistanceToNow(new Date(message.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>

      {/* Message body */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {message.body}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1">
        <Link
          href={`/listings/${message.listing.id}`}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ExternalLink className="h-3 w-3" />
          {message.listing.title}
        </Link>

        {!read && (
          <Button
            size="sm"
            variant="outline"
            onClick={markAsRead}
            disabled={isLoading}
          >
            {isLoading ? "..." : "Mark as read"}
          </Button>
        )}
      </div>
    </div>
  )
}
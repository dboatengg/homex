"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SavePropertyButtonProps {
  listingId: string
  initialSaved: boolean
}

export function SavePropertyButton({
  listingId,
  initialSaved,
}: SavePropertyButtonProps) {
  const [saved, setSaved] = useState(initialSaved)
  const [isLoading, setIsLoading] = useState(false)

  const toggle = async () => {
    setIsLoading(true)

    try {
      await fetch("/api/listings/save", {
        method: saved ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId }),
      })

      setSaved(!saved)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggle}
      disabled={isLoading}
      className={saved ? "text-red-500 border-red-500" : ""}
    >
      <Heart className={`h-4 w-4 ${saved ? "fill-red-500" : ""}`} />
    </Button>
  )
}
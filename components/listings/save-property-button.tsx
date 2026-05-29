"use client"

import { useState } from "react"
import { Heart } from "lucide-react"

interface SavePropertyButtonProps {
  listingId: string
  initialSaved: boolean
  fullWidth?: boolean
}

export function SavePropertyButton({
  listingId,
  initialSaved,
  fullWidth = false,
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

  if (fullWidth) {
    return (
      <button
        onClick={toggle}
        disabled={isLoading}
        className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border transition-colors ${
          saved
            ? "bg-red-50 border-red-200 text-red-500"
            : "border-gray-200 text-gray-700 hover:border-gray-300"
        }`}
      >
        <Heart className={`h-4 w-4 ${saved ? "fill-red-500 text-red-500" : ""}`} />
        {saved ? "Saved" : "Save property"}
      </button>
    )
  }

  return (
    <button
      onClick={toggle}
      disabled={isLoading}
      className={`h-10 w-10 rounded-xl border flex items-center justify-center transition-colors ${
        saved
          ? "bg-red-50 border-red-200 text-red-500"
          : "border-gray-200 text-gray-600 hover:border-gray-300"
      }`}
    >
      <Heart className={`h-4 w-4 ${saved ? "fill-red-500" : ""}`} />
    </button>
  )
}
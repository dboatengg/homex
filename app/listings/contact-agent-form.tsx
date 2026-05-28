"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface ContactAgentFormProps {
  listingId: string
  agentId: string
}

export function ContactAgentForm({ listingId, agentId }: ContactAgentFormProps) {
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId, receiverId: agentId, body: message }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.message || "Something went wrong")
        return
      }

      setSuccess(true)
      setMessage("")
    } catch (error) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="border rounded-xl p-5 text-center space-y-2">
        <p className="font-medium text-sm">Message sent!</p>
        <p className="text-xs text-muted-foreground">
          The agent will get back to you shortly.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSuccess(false)}
          className="mt-2"
        >
          Send another
        </Button>
      </div>
    )
  }

  return (
    <div className="border rounded-xl p-5 space-y-4">
      <h3 className="font-semibold">Contact agent</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        {error && (
          <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-md">
            {error}
          </p>
        )}
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="I'm interested in this property. Is it still available?"
            required
            rows={4}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send message"}
        </Button>
      </form>
    </div>
  )
}
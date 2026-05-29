"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

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
      <div className="border border-gray-200 rounded-2xl p-5 text-center space-y-3">
        <div className="flex justify-center">
          <div className="h-12 w-12 rounded-full bg-amber-50 flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-amber-500" />
          </div>
        </div>
        <p className="font-semibold text-gray-900 text-sm">Message sent!</p>
        <p className="text-xs text-gray-500">
          The agent will get back to you shortly.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="text-xs font-medium text-amber-500 hover:text-amber-600 underline underline-offset-2 transition-colors"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <div className="border border-gray-200 rounded-2xl p-5 space-y-4">
      <h3 className="font-bold text-gray-900">Contact agent</h3>

      <form onSubmit={handleSubmit} className="space-y-3">
        {error && (
          <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-xl">
            {error}
          </p>
        )}

        <div className="space-y-1.5">
          <Label htmlFor="message" className="text-sm font-medium text-gray-700">
            Message
          </Label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Hi, I'm interested in this property. Is it still available?"
            required
            rows={4}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 focus:bg-white transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold py-3 rounded-xl transition-colors disabled:opacity-50"
        >
          {isLoading ? "Sending..." : "Send message"}
        </button>
      </form>
    </div>
  )
}
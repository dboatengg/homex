"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, AlertCircle } from "lucide-react"

type ContactFormState = {
  name: string
  email: string
  message: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormState>({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [feedback, setFeedback] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("idle")
    setFeedback("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const result = await response.json()

      if (!response.ok) {
        setStatus("error")
        setFeedback(result?.message || "Unable to send your message.")
        return
      }

      setStatus("success")
      setFeedback(
        result.message ?? "Your message has been sent. We will contact you soon."
      )
      setFormData({ name: "", email: "", message: "" })
    } catch {
      setStatus("error")
      setFeedback("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 lg:p-10">
      {/* Form header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Send us a message</h2>
        <p className="text-gray-500 mt-1.5 text-sm">
          Fill out the form and we'll get back to you within 24 hours.
        </p>
      </div>

      {/* Feedback messages */}
      {status === "error" && (
        <div className="flex items-start gap-3 rounded-xl bg-red-50 border border-red-100 p-4 mb-6">
          <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{feedback}</p>
        </div>
      )}

      {status === "success" && (
        <div className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-100 p-4 mb-6">
          <CheckCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-700">{feedback}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name and email side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label
              htmlFor="name"
              className="text-sm font-medium text-gray-700"
            >
              Full name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Kwame Mensah"
              value={formData.name}
              onChange={handleChange}
              required
              className="h-11 rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="kwame@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="h-11 rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-colors"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="message"
            className="text-sm font-medium text-gray-700"
          >
            Message
          </Label>
          <textarea
            id="message"
            name="message"
            rows={6}
            placeholder="Tell us how we can help..."
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 focus:bg-white transition-colors resize-none"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-medium transition-colors"
        >
          {isLoading ? "Sending..." : "Send message"}
        </Button>
      </form>
    </div>
  )
}
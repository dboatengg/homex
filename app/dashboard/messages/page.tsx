import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { MessageCard } from "../message-card"

export default async function MessagesPage() {
  const session = await getServerSession(authOptions)

  if (!session) redirect("/signin")

  // Fetch messages received by the current user, newest first
  const messages = await db.message.findMany({
    where: { receiverId: session.user.id },
    include: {
      sender: true,
      listing: true,
    },
    orderBy: { createdAt: "desc" },
  })

  const unreadCount = messages.filter((m) => !m.read).length

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {unreadCount > 0
            ? `${unreadCount} unread message${unreadCount > 1 ? "s" : ""}`
            : "No unread messages"}
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((message) => (
            <MessageCard key={message.id} message={message} />
          ))}
        </div>
      )}
    </div>
  )
}
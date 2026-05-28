import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { listingId, receiverId, body } = await req.json()

    if (!listingId || !receiverId || !body) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      )
    }

    // Prevent users from messaging themselves
    if (session.user.id === receiverId) {
      return NextResponse.json(
        { message: "You cannot message yourself" },
        { status: 400 }
      )
    }

    await db.message.create({
      data: {
        body,
        listingId,
        senderId: session.user.id,
        receiverId,
      },
    })

    return NextResponse.json({ message: "Message sent" }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}
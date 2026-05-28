import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    // Only signed-in users can apply
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Agents and admins don't need to apply
    if (session.user.role !== "USER") {
      return NextResponse.json(
        { message: "You are already an agent or admin" },
        { status: 400 }
      )
    }

    const { phone, bio, idNumber } = await req.json()

    if (!phone || !bio || !idNumber) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      )
    }

    // Check if user already has a pending application
    const existing = await db.agentApplication.findUnique({
      where: { userId: session.user.id },
    })

    if (existing) {
      return NextResponse.json(
        { message: "You already have a pending application" },
        { status: 400 }
      )
    }

    await db.agentApplication.create({
      data: {
        userId: session.user.id,
        phone,
        bio,
        idNumber,
      },
    })

    return NextResponse.json(
      { message: "Application submitted successfully" },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}
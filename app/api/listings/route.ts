import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    // Only agents can create listings
    if (!session || session.user.role !== "AGENT") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()

    const listing = await db.listing.create({
      data: {
        ...body,
        agentId: session.user.id,
        status: "PENDING", // all new listings start as pending
      },
    })

    return NextResponse.json(listing, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}
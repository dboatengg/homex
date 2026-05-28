import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await req.json()

    // Make sure the listing belongs to this agent
    const listing = await db.listing.findUnique({
      where: { id, agentId: session.user.id },
    })

    if (!listing) {
      return NextResponse.json(
        { message: "Listing not found" },
        { status: 404 }
      )
    }

    const updated = await db.listing.update({
      where: { id },
      data: body,
    })

    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    // Make sure the listing belongs to this agent before deleting
    const listing = await db.listing.findUnique({
      where: { id, agentId: session.user.id },
    })

    if (!listing) {
      return NextResponse.json(
        { message: "Listing not found" },
        { status: 404 }
      )
    }

    await db.listing.delete({ where: { id } })

    return NextResponse.json({ message: "Listing deleted" })
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}
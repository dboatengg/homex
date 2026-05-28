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

    const { listingId } = await req.json()

    // Save the property for this user
    await db.savedProperty.create({
      data: { userId: session.user.id, listingId },
    })

    return NextResponse.json({ message: "Property saved" })
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { listingId } = await req.json()

    // Remove the saved property for this user
    await db.savedProperty.delete({
      where: {
        userId_listingId: {
          userId: session.user.id,
          listingId,
        },
      },
    })

    return NextResponse.json({ message: "Property unsaved" })
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}
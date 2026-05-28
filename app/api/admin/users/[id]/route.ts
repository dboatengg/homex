import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Prevent admin from deactivating themselves
    if (params.id === session.user.id) {
      return NextResponse.json(
        { message: "You cannot deactivate your own account" },
        { status: 400 }
      )
    }

    // Downgrade the user's role to USER as a soft deactivation
    await db.user.update({
      where: { id: params.id },
      data: { role: "USER" },
    })

    return NextResponse.json({ message: "User deactivated" })
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}
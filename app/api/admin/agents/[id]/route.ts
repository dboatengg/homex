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

    // Only admins can approve or reject applications
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { action } = await req.json()

    if (!["approve", "reject"].includes(action)) {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 })
    }

    const application = await db.agentApplication.findUnique({
      where: { id: params.id },
    })

    if (!application) {
      return NextResponse.json(
        { message: "Application not found" },
        { status: 404 }
      )
    }

    if (action === "approve") {
      // Update both the application status and the user's role in one transaction
      await db.$transaction([
        db.agentApplication.update({
          where: { id: params.id },
          data: { status: "APPROVED" },
        }),
        db.user.update({
          where: { id: application.userId },
          data: { role: "AGENT" },
        }),
      ])
    } else {
      await db.agentApplication.update({
        where: { id: params.id },
        data: { status: "REJECTED" },
      })
    }

    return NextResponse.json({ message: "Application updated" })
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}
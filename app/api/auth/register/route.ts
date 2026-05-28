import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      )
    }

    // Check if a user with this email already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 400 }
      )
    }

    // Hash the password before storing it — never store plain text passwords
    const hashedPassword = await bcrypt.hash(password, 12)

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json(
      { message: "Account created successfully" },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}
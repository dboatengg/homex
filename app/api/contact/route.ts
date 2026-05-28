import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { message: "Name, email, and message are required." },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        message:
          "Thanks for reaching out! Your message has been received and our team will contact you soon.",
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to submit request. Please try again later." },
      { status: 500 }
    )
  }
}

import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { username, password } = body || {}

    // Simple example validation - replace with real auth in production
    if (username === "admin" && password === "password") {
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
  } catch (err) {
    return NextResponse.json({ success: false, message: "Bad request" }, { status: 400 })
  }
}

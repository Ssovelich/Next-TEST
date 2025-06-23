import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { name, email, password } = await req.json();
  await connectDB();

  const exists = await User.findOne({ email });
  if (exists) {
    return NextResponse.json({ message: "Email зайнято" }, { status: 400 });
  }

  const newUser = await User.create({ name, email, password });
  return NextResponse.json({ user: newUser }, { status: 201 });
}

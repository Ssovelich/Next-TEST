import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    console.log("✅ Дані з форми:", name, email, password);

    await connectDB();
    console.log("✅ MongoDB підключено");

    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json({ message: "Email вже існує" }, { status: 400 });
    }

    // Хешуємо пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });
    console.log("✅ Користувач створений:", user);

    return NextResponse.json({ success: true }, { status: 201 });

  } catch (err) {
    console.error("❌ ПОМИЛКА в API /register:", err);
    return NextResponse.json({ message: "Серверна помилка" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    console.log("✅ Логін:", email);

    if (!email || !password) {
      return NextResponse.json({ message: "Email та пароль обов’язкові" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Користувача не знайдено" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Невірний пароль" }, { status: 401 });
    }

    // ✅ Створення JWT токена
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // ✅ Формуємо відповідь через new NextResponse()
    const response = new NextResponse(
      JSON.stringify({
        message: "Логін успішний",
        user: {
          name: user.name,
          email: user.email,
        },
        token, // ⬅️ лише якщо потрібно на клієнті, інакше видали
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // ✅ Встановлюємо cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
      // secure: process.env.NODE_ENV === "production",
      secure: false,
    });

    return response;
  } catch (error) {
    console.error("❌ ПОМИЛКА в API /login:", error);
    return NextResponse.json({ message: "Помилка на сервері" }, { status: 500 });
  }
}

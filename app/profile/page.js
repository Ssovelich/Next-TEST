export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export default async function ProfilePage() {
  // ✅ Правильний виклик cookies() — синхронно, одразу
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  let userId;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = decoded.userId;
  } catch (err) {
    console.error("❌ Невалідний токен:", err);
    redirect("/login");
  }

  await connectDB();
  const user = await User.findById(userId);

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="container">
      <h1>Профіль користувача</h1>
      <p><strong>Ім’я:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { getUserFromToken } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const userId = getUserFromToken();
  if (!userId) {
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

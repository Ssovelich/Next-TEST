import jwt from "jsonwebtoken";

export async function getUserFromToken() {
  const { cookies } = await import("next/headers")
  const token = cookies().get("token")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch {
    return null;
  }
}

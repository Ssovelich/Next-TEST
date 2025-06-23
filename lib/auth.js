import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export function getUserFromToken() {
  const token = cookies().get("token")?.value;
  if (!token) return null;

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    return data.userId;
  } catch (err) {
    return null;
  }
}

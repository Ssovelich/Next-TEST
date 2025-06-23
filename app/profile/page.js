"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const router = useRouter();

   useEffect(() => {
    if (!isLoggedIn) router.push("/login");
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, [isLoggedIn]);

  if (!isLoggedIn || !user) return null;

  return (
    <div>
      <h1>Профіль користувача</h1>
      <p><strong>Ім’я:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Пароль:</strong> {user.password}</p>
    </div>
  );
}

export default ProfilePage;

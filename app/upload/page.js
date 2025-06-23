"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";

const UploadPage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [author, setAuthor] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) router.push("/login");

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { name } = JSON.parse(storedUser);
      setAuthor(name);
    }
  }, [isLoggedIn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const photo = {
      id: Date.now(),
      title,
      thumbnailUrl: imageUrl,
      fullUrl: imageUrl,
      author,
    };
    const uploaded = JSON.parse(localStorage.getItem("myPhotos") || "[]");
    localStorage.setItem("myPhotos", JSON.stringify([photo, ...uploaded]));
    alert("Фото додано!");
    router.push("/");
  };

  if (!isLoggedIn) return null;

  return (
    <form onSubmit={handleSubmit} style={{ padding: 50 }}>
      <h1>Додати фото</h1>
      <input
        placeholder="Назва"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        placeholder="Посилання на зображення"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
      />
      <button type="submit">Завантажити</button>
    </form>
  );
}

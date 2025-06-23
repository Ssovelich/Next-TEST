"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

function generatePhotos() {
  return Array.from({ length: 12 }, (_, i) => {
    const id = i + 10;
    return {
      id,
      title: `Фото #${id}`,
      thumbnailUrl: `https://picsum.photos/id/${id}/300/200`,
      fullUrl: `https://picsum.photos/id/${id}/800/600`,
      author: `Автор #${id}`,
    };
  });
}

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [start, setStart] = useState(10);

  useEffect(() => {
    setPhotos(generatePhotos());
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLike = (id) => {
    setPhotos((prev) =>
      prev.map((photo) =>
        photo.id === id ? { ...photo, likes: photo.likes + 1 } : photo
      )
    );
  };

  const loadMore = () => {
    const newStart = start + 12;
    const newPhotos = generatePhotos(newStart);
    setPhotos((prev) => [...prev, ...newPhotos]);
    setStart(newStart);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>
        {isLoggedIn ? "Ласкаво просимо назад!" : "Головна сторінка"}
      </h1>

      <div className={styles.wrapperPhotos}>
        {photos.map((photo) => (
          <div key={photo.id} className={styles.card}>
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <h2 className={styles.cardTitle}>{photo.title}</h2>
            <p className={styles.author}>{photo.author}</p>
            <Link href={`/photo/${photo.id}`}>Переглянути деталі</Link>
            {isLoggedIn && (
              <button onClick={() => handleLike(photo.id)}>
                ❤️ Лайк ({photo.likes})
              </button>
            )}
          </div>
        ))}
      </div>

      <button className={styles.loadMore} onClick={loadMore}>
        Завантажити ще
      </button>
    </div>
  );
};

export default Home;

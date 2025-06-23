'use client';

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

  useEffect(() => {
    setPhotos(generatePhotos());
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>
        {isLoggedIn ? "Добре що Ви повернулись!" : "Головна сторінка"}
      </h1>

      <div className={styles.grid}>
        {photos.map((photo) => (
          <div key={photo.id} className={styles.card}>
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <h2>{photo.title}</h2>
            <p>{photo.author}</p>
            <Link href={`/photo/${photo.id}`}>Переглянути деталі</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
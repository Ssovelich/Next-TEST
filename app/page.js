"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import Loader from "./components/Loader/Loader";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";

function generatePhotos(start = 10, count = 9) {
  return Array.from({ length: count }, (_, i) => {
    const id = start + i;
    return {
      id,
      title: `Фото #${id}`,
      thumbnailUrl: `https://picsum.photos/id/${id}/300/200`,
      fullUrl: `https://picsum.photos/id/${id}/800/600`,
      author: `Автор #${id}`,
      liked: false,
    };
  });
}

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [start, setStart] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    loadInitialPhotos();
  }, []);

  const loadInitialPhotos = async () => {
    setIsLoading(true);
    const uploaded = JSON.parse(localStorage.getItem("myPhotos") || "[]");
    const newPhotos = generatePhotos(start, 9);
    await new Promise((res) => setTimeout(res, 1000));
    setPhotos([...uploaded, ...newPhotos]);
    setStart(start + 9);
    setIsLoading(false);
  };

  const handleToggleLike = (id) => {
    setPhotos((prev) =>
      prev.map((photo) =>
        photo.id === id ? { ...photo, liked: !photo.liked } : photo
      )
    );

    const my = JSON.parse(localStorage.getItem("myPhotos") || "[]");
    const updated = my.map((p) =>
      p.id === id ? { ...p, liked: !p.liked } : p
    );
    localStorage.setItem("myPhotos", JSON.stringify(updated));
  };

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleDelete = (id) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));

    const my = JSON.parse(localStorage.getItem("myPhotos") || "[]");
    const updated = my.filter((p) => p.id !== id);
    localStorage.setItem("myPhotos", JSON.stringify(updated));
    toast.success("Photo deleted");
  };

  const loadMore = async () => {
    setIsLoading(true);
    const newPhotos = generatePhotos(start, 9);
    await new Promise((res) => setTimeout(res, 1000));
    setPhotos((prev) => [...prev, ...newPhotos]);
    setStart(start + 9);
    setIsLoading(false);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>
        {isLoggedIn ? "Ласкаво просимо назад!" : "Головна сторінка"}
      </h1>

      {isLoading && photos.length === 0 && <Loader />}

      <div className={styles.wrapperPhotos}>
        {photos.map((photo) => (
          <div key={photo.id} className={styles.card}>
            {!loadedImages[photo.id] && <Loader />}
            <img
              src={photo.thumbnailUrl}
              alt={photo.title}
              onLoad={() => handleImageLoad(photo.id)}
              onError={() => handleImageLoad(photo.id)}
              crossOrigin="anonymous"
              loading="lazy"
            />
            <h2 className={styles.cardTitle}>{photo.title}</h2>
            <p className={styles.author}>Author:&nbsp;{photo.author}</p>
            <Link href={`/photo/${photo.id}`}>Переглянути деталі</Link>
            {isLoggedIn && (
              <button
                onClick={() => handleToggleLike(photo.id)}
                className={styles.likeButton}
              >
                {photo.liked ? <IoIosHeart /> : <IoIosHeartEmpty />}
              </button>
            )}
            {isLoggedIn && (
              <button
                onClick={() => handleDelete(photo.id)}
                className={styles.deleteButton}
              >
                <MdDeleteForever size={"20px"} />
              </button>
            )}
          </div>
        ))}
      </div>

      {isLoading && photos.length > 0 && <Loader />}

      {!isLoading && (
        <button className={styles.loadMore} onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Home;

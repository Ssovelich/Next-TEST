"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import Loader from "./components/Loader/Loader";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

const PLACEHOLDER = "/placeholder.jpg";

function generatePhotos(start = 10, count = 9) {
  return Array.from({ length: count }, (_, i) => {
    const id = start + i;
    return {
      id: String(id),
      title: `Photo #${id}`,
      thumbnailUrl: `https://picsum.photos/id/${id}/300/200`,
      fullUrl: `https://picsum.photos/id/${id}/800/600`,
      author: `Author #${id}`,
      liked: false,
    };
  });
}

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [start, setStart] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedImages, setLoaded] = useState({});
  const [likedIds, setLikedIds] = useState([]);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const storedLikes = JSON.parse(
      window.localStorage.getItem("likedPhotos") || "[]"
    );
    const uploaded = JSON.parse(
      window.localStorage.getItem("myPhotos") || "[]"
    );

    setIsLoggedIn(!!token);
    setLikedIds(storedLikes);

    const demo = generatePhotos(start, 9).map((p) => ({
      ...p,
      liked: storedLikes.includes(String(p.id)),
    }));

    const merged = [
      ...uploaded.map((p) => ({
        ...p,
        liked:
          typeof p.liked === "boolean"
            ? p.liked
            : storedLikes.includes(String(p.id)),
      })),
      ...demo,
    ];

    setPhotos(merged);
    setStart(start + 9);
  }, []);

  const handleImageLoad = (id) => {
    setLoaded((prev) => ({ ...prev, [id]: true }));
  };

  const toggleLike = (id) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, liked: !p.liked } : p))
    );

    setLikedIds((prev) => {
      const strId = String(id);
      const next = prev.includes(strId)
        ? prev.filter((x) => x !== strId)
        : [...prev, strId];
      window.localStorage.setItem("likedPhotos", JSON.stringify(next));
      return next;
    });

    const mine = JSON.parse(
      window.localStorage.getItem("myPhotos") || "[]"
    ).map((p) => (p.id === id ? { ...p, liked: !p.liked } : p));
    window.localStorage.setItem("myPhotos", JSON.stringify(mine));
  };

  const handleDelete = (id) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));

    const mine = JSON.parse(window.localStorage.getItem("myPhotos") || "[]");
    window.localStorage.setItem(
      "myPhotos",
      JSON.stringify(mine.filter((p) => p.id !== id))
    );

    toast.success("Photo deleted");
  };

  const loadMore = async () => {
    setIsLoading(true);
    const more = generatePhotos(start, 9).map((p) => ({
      ...p,
      liked: likedIds.includes(String(p.id)),
    }));
    await new Promise((r) => setTimeout(r, 800));
    setPhotos((prev) => [...prev, ...more]);
    setStart(start + 9);
    setIsLoading(false);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>
        {isLoggedIn ? "Welcome back!" : "Home page"}
      </h1>

      {isLoading && photos.length === 0 && <Loader />}

      <div className={styles.wrapperPhotos}>
        {photos.map((photo) => (
          <div key={photo.id} className={styles.card}>
            {!loadedImages[photo.id] && <Loader />}

            <img
              src={photo.thumbnailUrl}
              alt={photo.title}
              loading="lazy"
              crossOrigin="anonymous"
              onLoad={() => handleImageLoad(photo.id)}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = PLACEHOLDER;
                handleImageLoad(photo.id);
              }}
            />

            <button
              className={styles.likeButton}
              onClick={() => toggleLike(photo.id)}
            >
              {photo.liked ? <IoIosHeart /> : <IoIosHeartEmpty />}
            </button>

            {isLoggedIn && (
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(photo.id)}
              >
                <MdDeleteForever size={20} />
              </button>
            )}

            <h2 className={styles.cardTitle}>{photo.title}</h2>
            <p className={styles.author}>Author: {photo.author}</p>
            <Link href={`/photo/${photo.id}`}>View details</Link>
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

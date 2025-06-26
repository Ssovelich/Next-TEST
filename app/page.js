"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import Loader from "./components/Loader/Loader";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { fetchPhotos } from "../lib/unsplash";

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedImages, setLoaded] = useState({});
  const [likedIds, setLikedIds] = useState([]);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");
      const storedLikes = JSON.parse(localStorage.getItem("likedPhotos") || "[]");
      const uploaded = JSON.parse(localStorage.getItem("myPhotos") || "[]");
      setIsLoggedIn(!!token);
      setLikedIds(storedLikes);

      const remote = await loadPhotos(page, storedLikes);
      const merged = [
        ...uploaded.map(p => ({
          ...p,
          liked: typeof p.liked === "boolean"
            ? p.liked
            : storedLikes.includes(p.id),
        })),
        ...remote,
      ];

      setPhotos(merged);
      setPage(prev => prev + 1);
    };

    init();
  }, []);

  const loadPhotos = async (pageNum, likesFromStorage) => {
  try {
    const raw = await fetchPhotos(pageNum);
    // console.log("Fetched from server:", raw);
    return raw.map(p => ({
      ...p,
      liked: likesFromStorage.includes(p.id),
    }));
  } catch (err) {
    console.error(err);
    toast.error("Error loading images");
    return [];
  }
};

  const handleImageLoad = (id) => setLoaded(prev => ({ ...prev, [id]: true }));

  const toggleLike = (id) => {
    setPhotos(prev =>
      prev.map(p => p.id === id ? { ...p, liked: !p.liked } : p)
    );

    setLikedIds(prev => {
      const next = prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id];
      window.localStorage.setItem("likedPhotos", JSON.stringify(next));
      return next;
    });

    const mine = JSON.parse(localStorage.getItem("myPhotos") || "[]")
      .map(p => p.id === id ? { ...p, liked: !p.liked } : p);
    localStorage.setItem("myPhotos", JSON.stringify(mine));
  };

  const handleDelete = (id) => {
    setPhotos(prev => prev.filter(p => p.id !== id));

    const mine = JSON.parse(localStorage.getItem("myPhotos") || "[]")
      .filter(p => p.id !== id);
    localStorage.setItem("myPhotos", JSON.stringify(mine));

    toast.success("Photo deleted");
  };

  const loadMore = async () => {
    setIsLoading(true);
    const more = await loadPhotos(page);
    await new Promise(r => setTimeout(r, 800));
    setPhotos(prev => [...prev, ...more]);
    setPage(prev => prev + 1);
    setIsLoading(false);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>
        {isLoggedIn ? "Welcome back!" : "Home page"}
      </h1>

      {isLoading && photos.length === 0 && <Loader />}

      <div className={styles.wrapperPhotos}>
        {photos.map(photo => (
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
                e.currentTarget.src = "/placeholder.jpg";
                handleImageLoad(photo.id);
              }}
            />
            <button className={styles.likeButton} onClick={() => toggleLike(photo.id)}>
              {photo.liked ? <IoIosHeart /> : <IoIosHeartEmpty />}
            </button>
            {isLoggedIn && (
              <button className={styles.deleteButton} onClick={() => handleDelete(photo.id)}>
                <MdDeleteForever size={20} />
              </button>
            )}
            <h2 className={styles.cardTitle}>{photo.title}</h2>
            <p className={styles.author}>
              Author:&nbsp;
              <a href={photo.authorLink} target="_blank" rel="noopener noreferrer">
                {photo.author}
              </a>
            </p>
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

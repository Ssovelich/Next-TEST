"use client";

import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import Loader from "./components/Loader/Loader";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { fetchPhotos } from "../lib/unsplash";
import { AuthContext } from "./context/AuthContext";

const Home = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedImages, setLoaded] = useState({});
  const [likedIds, setLikedIds] = useState([]);

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likedPhotos") || "[]");
    const uploaded = JSON.parse(localStorage.getItem("myPhotos") || "[]");

    setLikedIds(storedLikes);

    const init = async () => {
      const remote = await loadPhotos(page, storedLikes);

      const merged = [
        ...uploaded.map((p) => ({
          ...p,
          isMine: true,
          liked: isLoggedIn
            ? typeof p.liked === "boolean"
              ? p.liked
              : storedLikes.includes(p.id)
            : false,
        })),
        ...remote.map((p) => ({
          ...p,
          liked: isLoggedIn && storedLikes.includes(p.id),
        })),
      ];

      setPhotos(merged);
      setPage((prev) => prev + 1);
    };

    init();
  }, [isLoggedIn]);

  const loadPhotos = async (pageNum, likesFromStorage = []) => {
    try {
      const raw = await fetchPhotos(pageNum);
      return raw.map((p) => ({
        ...p,
        liked: likesFromStorage.includes(p.id),
      }));
    } catch (err) {
      console.error(err);
      toast.error("Error loading images");
      return [];
    }
  };

  const handleImageLoad = (id) =>
    setLoaded((prev) => ({ ...prev, [id]: true }));

  const toggleLike = (id) => {
    if (!isLoggedIn) {
      toast.error("First, log in.");
      return;
    }

    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, liked: !p.liked } : p))
    );

    setLikedIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      localStorage.setItem("likedPhotos", JSON.stringify(next));
      return next;
    });

    const mine = JSON.parse(localStorage.getItem("myPhotos") || "[]").map((p) =>
      p.id === id ? { ...p, liked: !p.liked } : p
    );
    localStorage.setItem("myPhotos", JSON.stringify(mine));
  };

  const handleDelete = (id) => {
    const photo = photos.find((p) => p.id === id);

    if (!isLoggedIn || !photo?.isMine) {
      toast.error("Видалення дозволено лише для власних фото");
      return;
    }

    setPhotos((prev) => prev.filter((p) => p.id !== id));

    const mine = JSON.parse(localStorage.getItem("myPhotos") || "[]").filter(
      (p) => p.id !== id
    );
    localStorage.setItem("myPhotos", JSON.stringify(mine));

    toast.success("Фото видалено");
  };

  const loadMore = async () => {
    setIsLoading(true);
    const more = await loadPhotos(page, likedIds);
    await new Promise((r) => setTimeout(r, 800));
    setPhotos((prev) => [...prev, ...more]);
    setPage((prev) => prev + 1);
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
                e.currentTarget.src = "/placeholder.jpg";
                handleImageLoad(photo.id);
              }}
            />
            {isLoggedIn && (
              <button
                className={styles.likeButton}
                onClick={() => toggleLike(photo.id)}
              >
                {photo.liked ? <IoIosHeart /> : <IoIosHeartEmpty />}
              </button>
            )}
            {isLoggedIn && photo.isMine && (
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(photo.id)}
              >
                <MdDeleteForever size={20} />
              </button>
            )}
            <h2 className={styles.cardTitle}>{photo.title}</h2>
            <p className={styles.author}>
              Author:&nbsp;
              <a
                href={photo.authorLink}
                target="_blank"
                rel="noopener noreferrer"
              >
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

"use client";

import { useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import Loader from "../../components/Loader/Loader";
import styles from "../../page.module.css";

const LikedPhotos = () => {
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) return;

   const likedIds = JSON.parse(localStorage.getItem(`likedPhotos_${user.email}`) || "[]");
    const myPhotos = JSON.parse(localStorage.getItem("myPhotos") || "[]");
    const allLiked = [...myPhotos].filter((p) => likedIds.includes(p.id));

    setPhotos(allLiked);
  }, [isLoggedIn]);

  if (isLoading) return <Loader />;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Liked Photos</h1>
      <div className={styles.wrapperPhotos}>
        {photos.length === 0 ? (
          <p>No liked photos found.</p>
        ) : (
          photos.map((photo) => (
            <div key={photo.id} className={styles.card}>
              <img src={photo.thumbnailUrl} alt={photo.title} />
              <h2 className={styles.cardTitle}>{photo.title}</h2>
              <p className={styles.author}>Author: {photo.author}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LikedPhotos;

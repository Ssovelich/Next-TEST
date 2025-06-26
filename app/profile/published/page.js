"use client";

import { useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import Loader from "../../components/Loader/Loader";
import styles from "../../page.module.css";

const PublishedPhotos = () => {
  const { user, isLoading } = useContext(AuthContext);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const allPhotos = JSON.parse(localStorage.getItem("myPhotos") || "[]");
    const mine = allPhotos.filter((p) => p.author === user?.name);
    setPhotos(mine);
  }, [user]);

  if (isLoading) return <Loader />;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>My Published Photos</h1>
      <div className={styles.wrapperPhotos}>
        {photos.length === 0 ? (
          <p>You haven't published any photos yet.</p>
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

export default PublishedPhotos;

"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
import styles from "./page.module.css";
import Loader from "../components/Loader/Loader"; 

const ProfilePage = () => {
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);
  const router = useRouter();
  const [publishedCount, setPublishedCount] = useState(0);
  const [likedCount, setLikedCount] = useState(0);

  useEffect(() => {
    if (isLoading) return;

    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    const allPhotos = JSON.parse(localStorage.getItem("myPhotos") || "[]");

    const authoredPhotos = allPhotos.filter(
      (photo) => photo.author === user?.name
    );
    setPublishedCount(authoredPhotos.length);

    const likedPhotos = JSON.parse(localStorage.getItem("likedPhotos") || "[]");
    setLikedCount(likedPhotos.length);
  }, [isLoggedIn, isLoading, user, router]);

  if (isLoading) return <Loader />;

  return (
    <div className="container">
      <h1 className={styles.title}>Profile</h1>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <hr />
      <p><strong>Published photos:</strong> {publishedCount}</p>
      <p><strong>Liked photos:</strong> {likedCount}</p>
    </div>
  );
};

export default ProfilePage;

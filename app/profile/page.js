"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
import styles from "./page.module.css";
import Loader from "../components/Loader/Loader";
import Link from "next/link";

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

    const likedPhotos = JSON.parse(localStorage.getItem(`likedPhotos_${user?.email}`) || "[]");
    setLikedCount(likedPhotos.length);
  }, [isLoggedIn, isLoading, user, router]);

  if (isLoading) return <Loader />;

  return (
    <div className="container">
      <h1 className={styles.title}>Profile</h1>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <hr />
      <p>
        <strong>Published photos:</strong>{" "}
        <Link href="/profile/published">{publishedCount}</Link>
      </p>
      <p>
        <strong>Liked photos:</strong>{" "}
        <Link href="/profile/liked">{likedCount}</Link>
      </p>
    </div>
  );
};

export default ProfilePage;

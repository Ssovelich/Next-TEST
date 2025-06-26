"use client";

import { useEffect } from "react";
import styles from "./not-found.module.css";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>404 - Сторінку не знайдено</h1>
      <p className={styles.text}>Вибачте, але сторінка, яку ви шукаєте, не існує 😢.</p>
    </div>
  );
};

export default NotFound;

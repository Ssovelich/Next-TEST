'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

async function fetchData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/photos?_limit=12");
  const result = await res.json();
  return result;
}

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchData().then(setPhotos);
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div>
      <h1>{isLoggedIn ? "Ласкаво просимо назад!" : "Головна сторінка"}</h1>
      {photos.map((photo) => (
        <div key={photo.id} className="photo">
          <h2>{photo.title}</h2>
          <img src={photo.thumbnailUrl} alt={photo.title} />
          <Link href={`/photo/${photo.id}`}>Деталі</Link>
        </div>
      ))}
    </div>
  );
}

export default Home;

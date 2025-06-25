"use client";

import { useContext, useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
import styles from "./page.module.css";
import Loader from "../components/Loader/Loader";
import toast from "react-hot-toast";

const UploadPage = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const dropRef = useRef(null);

  useEffect(() => {
    if (!isLoggedIn) router.push("/login");
  }, [isLoggedIn]);

  const handleFile = useCallback((file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setFile(file);

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  }, []);

  const onInputChange = (e) => handleFile(e.target.files[0]);
  const onDragOver = (e) => e.preventDefault();
  const onDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select an image first");
      return;
    }

    setIsSubmitting(true);

    const photo = {
      id: Date.now(),
      title,
      thumbnailUrl: preview,
      fullUrl: preview,
      author: user?.name || "Unknown",
    };
    const uploaded = JSON.parse(localStorage.getItem("myPhotos") || "[]");
    localStorage.setItem("myPhotos", JSON.stringify([photo, ...uploaded]));

    toast.success("Photo uploaded successfully!");

    setTimeout(() => {
      router.push("/");
      setIsSubmitting(false);
    }, 300);
  };

  if (!isLoggedIn) return null;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.title}>Add a photo</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className={styles.input}
        type="text"
      />

      <div
        ref={dropRef}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={() => dropRef.current.querySelector("input").click()}
        className={styles.dropZone}
      >
        {preview ? (
          <img src={preview} alt="preview" />
        ) : (
          <p>Drag & drop an image here, or click to select</p>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={onInputChange}
          style={{ display: "none" }}
        />
      </div>

      <button type="submit" disabled={!file} className={styles.buttonUpload}>
        {isSubmitting ? <Loader /> : "Upload Photo"}
      </button>
    </form>
  );
};

export default UploadPage;

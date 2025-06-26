"use client";

import { useRouter } from "next/navigation";
import { useState, useContext } from "react";
import styles from "./page.module.css";
import Loader from "../components/Loader/Loader";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Помилка входу");
        return;
      }

      // ✅ Зберігаємо в контекст
      login(null, data.user)

      toast.success("Вхід виконано успішно!");
      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch (err) {
      toast.error("Сервер недоступний");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Вхід</h1>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            className={styles.input}
            type="password"
            name="password"
            placeholder="Пароль"
            onChange={handleChange}
            required
          />
          <button className={styles.button} type="submit">
            {isSubmitting ? <Loader /> : "Увійти"}
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

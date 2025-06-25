"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";
import Loader from "../components/Loader/Loader";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Помилка при реєстрації");
        return;
      }

      toast.success("Реєстрація успішна!");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      toast.error("Сервер недоступний");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Реєстрація</h2>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            name="name"
            placeholder="Ім’я"
            onChange={handleChange}
            required
          />
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
            {isSubmitting ? <Loader /> : "Зареєструватися"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

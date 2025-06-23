"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
import styles from "./page.module.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.token) {
      login(data.token); // ✅
      router.push("/");
    } else {
      alert("Невірний логін або пароль");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Логін</h2>
          <input
            className={styles.input}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Пароль"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={styles.button} type="submit">
            Увійти
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;

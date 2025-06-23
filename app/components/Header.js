"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.png"; // Adjust the path as necessary
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <header>
      <strong>Next-TEST</strong>
       <nav style={{ display: "flex", gap: "10px" }}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        {!isLoggedIn ? (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} style={{ cursor: "pointer" }}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;

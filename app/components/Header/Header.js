"use client";

import Link from "next/link";
// import Image from "next/image";
import logo from "../../../public/logo.png"; // Adjust the path as necessary
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Header.module.css";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userInitial, setUserInitial] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (token) {
      setIsLoggedIn(true);
      setUserInitial(user?.name?.[0]?.toUpperCase() || "U");
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link href="/" className={styles.logo}>
          Next-TEST
        </Link>

        <div className={styles.rightSide}>
          {/* Desktop navigation */}
          <nav className={styles.navDesktop}>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            {isLoggedIn && <Link href="/upload">Upload</Link>}
            {!isLoggedIn ? (
              <>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
              </>
            ) : null}
          </nav>

          {/* User avatar — always shown if logged in */}
          {isLoggedIn && (
            <div className={styles.userMenu}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={styles.userBtn}
              >
                {userInitial}
              </button>
              {menuOpen && (
                <div className={styles.dropdown}>
                  <Link href="/profile">Профіль</Link>
                  <button onClick={handleLogout}>Вийти</button>
                </div>
              )}
            </div>
          )}

          {/* Burger — only mobile */}
          <button
            className={`${styles.burger} ${mobileMenuOpen ? styles.open : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        {mobileMenuOpen && (
          <MobileMenu
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
            onClose={() => setMobileMenuOpen(false)}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
